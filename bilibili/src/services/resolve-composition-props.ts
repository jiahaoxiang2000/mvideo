import { z } from "zod";
import type { Asset, Clip, Project, Track } from "../../types/models";
import {
  defaultFinalProps,
  defaultMainProps,
  FinalCompositionProps,
  INTRO_DURATION_IN_FRAMES,
  MAIN_DURATION_IN_FRAMES,
  MainCompositionProps,
  OUTRO_DURATION_IN_FRAMES,
  OverlayItemProps,
} from "../../types/constants";

const textOverlayTypeSchema = z.enum(["title", "lower-third", "cta", "text"]);
const imageObjectFitSchema = z.enum([
  "contain",
  "cover",
  "fill",
  "none",
  "scale-down",
]);

const getMetaString = (asset: Asset, key: string) => {
  const value = asset.meta?.[key];
  return typeof value === "string" ? value : undefined;
};

const getMetaNumber = (asset: Asset, key: string) => {
  const value = asset.meta?.[key];
  return typeof value === "number" ? value : undefined;
};

const getMetaEnum = <Schema extends z.ZodTypeAny>(
  asset: Asset,
  key: string,
  schema: Schema,
) => {
  const value = getMetaString(asset, key);
  if (!value) {
    return undefined;
  }

  const parsed = schema.safeParse(value);
  return parsed.success ? parsed.data : undefined;
};

const getPrimaryVideoClip = (tracks: Track[]) => {
  const videoTrack = tracks.find((track) => track.kind === "video");
  if (!videoTrack || videoTrack.clips.length === 0) {
    return undefined;
  }

  return [...videoTrack.clips].sort((a, b) => a.startFrame - b.startFrame)[0];
};

const getOverlayTracks = (tracks: Track[]) =>
  tracks.filter((track) => track.kind === "overlay");

const resolveTextOverlay = (clip: Clip, asset: Asset) => {
  const overlayType = getMetaEnum(asset, "type", textOverlayTypeSchema) ?? "text";
  const text = getMetaString(asset, "text") ?? asset.name ?? "Overlay";

  return {
    id: clip.id,
    type: overlayType,
    text,
    startFrame: clip.startFrame,
    durationInFrames: clip.durationInFrames,
    x: getMetaNumber(asset, "x"),
    y: getMetaNumber(asset, "y"),
    enterDurationInFrames: getMetaNumber(asset, "enterDurationInFrames"),
    exitDurationInFrames: getMetaNumber(asset, "exitDurationInFrames"),
  };
};

const resolveImageOverlay = (clip: Clip, asset: Asset) => {
  return {
    id: clip.id,
    type: "image",
    src: asset.src,
    alt: getMetaString(asset, "alt"),
    width: getMetaNumber(asset, "width"),
    height: getMetaNumber(asset, "height"),
    objectFit: getMetaEnum(asset, "objectFit", imageObjectFitSchema),
    borderRadius: getMetaNumber(asset, "borderRadius"),
    startFrame: clip.startFrame,
    durationInFrames: clip.durationInFrames,
    x: getMetaNumber(asset, "x"),
    y: getMetaNumber(asset, "y"),
    enterDurationInFrames: getMetaNumber(asset, "enterDurationInFrames"),
    exitDurationInFrames: getMetaNumber(asset, "exitDurationInFrames"),
  };
};

const resolveOverlayItems = (project: Project) => {
  const assetsById = new Map(project.assets.map((asset) => [asset.id, asset]));

  return getOverlayTracks(project.tracks).flatMap((track) =>
    track.clips
      .map((clip) => {
        const asset = assetsById.get(clip.assetId);
        if (!asset) {
          return null;
        }

        if (asset.kind === "image") {
          return resolveImageOverlay(clip, asset);
        }

        if (asset.kind === "text") {
          return resolveTextOverlay(clip, asset);
        }

        return null;
      })
      .filter(Boolean),
  );
};

export const resolveProjectToMainCompositionProps = (project: Project) => {
  const primaryClip = getPrimaryVideoClip(project.tracks);
  const asset = project.assets.find((item) => item.id === primaryClip?.assetId);

  if (!primaryClip || !asset) {
    return MainCompositionProps.parse(defaultMainProps);
  }

  const trimStartInFrames = primaryClip.trimStartFrame ?? 0;
  const trimEndInFrames = trimStartInFrames + primaryClip.durationInFrames;
  const overlays = resolveOverlayItems(project);

  return MainCompositionProps.parse({
    videoSrc: asset.src,
    trimStartInFrames,
    trimEndInFrames,
    overlays:
      overlays.length > 0
        ? OverlayItemProps.array().parse(overlays)
        : defaultMainProps.overlays,
  });
};

export const resolveProjectToFinalCompositionProps = (project: Project) => {
  const intro = project.intro ?? defaultFinalProps.intro;
  const outro = project.outro ?? defaultFinalProps.outro;
  const main = resolveProjectToMainCompositionProps(project);
  const mainDuration = project.durationInFrames || MAIN_DURATION_IN_FRAMES;

  return FinalCompositionProps.parse({
    intro,
    main,
    outro,
    introDurationInFrames: intro ? INTRO_DURATION_IN_FRAMES : 0,
    mainDurationInFrames: mainDuration,
    outroDurationInFrames: outro ? OUTRO_DURATION_IN_FRAMES : 0,
  });
};
