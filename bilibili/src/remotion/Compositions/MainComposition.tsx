import { z } from "zod";
import {
  AbsoluteFill,
  Sequence,
  Video,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { ReactNode } from "react";
import {
  MainCompositionProps,
  OverlayItemProps,
} from "../../../types/constants";

type OverlayItem = z.infer<typeof OverlayItemProps>;
type TextOverlay = Extract<
  OverlayItem,
  { type: "title" | "lower-third" | "cta" | "text" }
>;
type ImageOverlay = Extract<OverlayItem, { type: "image" }>;

const resolveVideoSrc = (src: string) => {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return staticFile(src);
};

const textOverlayStyles: Record<TextOverlay["type"], string> = {
  title:
    "bg-slate-950/80 text-2xl font-semibold tracking-tight text-white",
  "lower-third": "bg-slate-900/80 text-lg font-medium text-white",
  cta: "bg-orange-500 text-sm font-semibold uppercase tracking-[0.2em] text-white",
  text: "bg-slate-900/75 text-base font-medium text-white",
};

const isImageOverlay = (overlay: OverlayItem): overlay is ImageOverlay =>
  overlay.type === "image";

const OverlayBase = ({
  overlay,
  children,
}: {
  overlay: OverlayItem;
  children: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const enterDuration = Math.max(0, overlay.enterDurationInFrames ?? 12);
  const exitDuration = Math.max(0, overlay.exitDurationInFrames ?? 12);
  const enterEnd = Math.min(enterDuration, overlay.durationInFrames);
  const exitStart = Math.max(enterEnd, overlay.durationInFrames - exitDuration);
  const hasExit = exitDuration > 0 && overlay.durationInFrames > 0;
  const enter = interpolate(frame, [0, enterEnd], [20, 0], {
    extrapolateRight: "clamp",
  });
  const exit = hasExit
    ? interpolate(frame, [exitStart, overlay.durationInFrames], [0, -12], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const opacity = interpolate(
    frame,
    hasExit
      ? [0, enterEnd, exitStart, overlay.durationInFrames]
      : [0, enterEnd, overlay.durationInFrames],
    hasExit ? [0, 1, 1, 0] : [0, 1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      className="absolute"
      style={{
        left: overlay.x ?? 80,
        top: overlay.y ?? 80,
        transform: `translateY(${enter + exit}px)`,
        opacity,
      }}
    >
      {children}
    </div>
  );
};

const OverlayText = ({ overlay }: { overlay: TextOverlay }) => {
  return (
    <div
      className={`rounded-2xl px-5 py-3 shadow-[0_20px_40px_rgba(15,23,42,0.35)] backdrop-blur ${
        textOverlayStyles[overlay.type]
      }`}
    >
      {overlay.text}
    </div>
  );
};

const OverlayImage = ({ overlay }: { overlay: ImageOverlay }) => {
  const width = overlay.width ?? 240;
  const height = overlay.height ?? 135;
  const src = resolveVideoSrc(overlay.src);

  return (
    <img
      src={src}
      alt={overlay.alt ?? ""}
      className="shadow-[0_20px_40px_rgba(15,23,42,0.35)]"
      style={{
        width,
        height,
        objectFit: overlay.objectFit ?? "cover",
        borderRadius: overlay.borderRadius ?? 16,
      }}
    />
  );
};

export const MainComposition = (
  props: z.infer<typeof MainCompositionProps>,
) => {
  const { videoSrc, trimStartInFrames, trimEndInFrames, overlays } = props;
  const resolvedVideoSrc = resolveVideoSrc(videoSrc);
  const clipStart = Math.max(0, trimStartInFrames);
  const clipEnd = Math.max(clipStart + 1, trimEndInFrames);

  return (
    <AbsoluteFill className="bg-black">
      <Video
        src={resolvedVideoSrc}
        trimBefore={clipStart}
        trimAfter={clipEnd}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {overlays.map((overlay) => (
        <Sequence
          key={overlay.id}
          from={overlay.startFrame}
          durationInFrames={overlay.durationInFrames}
        >
          <OverlayBase overlay={overlay}>
            {isImageOverlay(overlay) ? (
              <OverlayImage overlay={overlay} />
            ) : (
              <OverlayText overlay={overlay} />
            )}
          </OverlayBase>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
