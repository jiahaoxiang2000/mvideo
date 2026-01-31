import type { ComponentType } from "react";
import type { z } from "zod";
import {
  COMP_NAME,
  defaultFinalProps,
  defaultIntroProps,
  defaultMainProps,
  defaultMyCompProps,
  defaultNextLogoProps,
  defaultOutroProps,
  DURATION_IN_FRAMES,
  FINAL_COMP_NAME,
  FINAL_DURATION_IN_FRAMES,
  FinalCompositionProps,
  INTRO_COMP_NAME,
  INTRO_DURATION_IN_FRAMES,
  IntroCompositionProps,
  MAIN_COMP_NAME,
  MAIN_DURATION_IN_FRAMES,
  MainCompositionProps,
  MyCompProps,
  NEXT_LOGO_COMP_NAME,
  NextLogoProps,
  OUTRO_COMP_NAME,
  OUTRO_DURATION_IN_FRAMES,
  OutroCompositionProps,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { FinalComposition } from "./Compositions/FinalComposition";
import { IntroComposition } from "./Compositions/IntroComposition";
import { MainComposition } from "./Compositions/MainComposition";
import { OutroComposition } from "./Compositions/OutroComposition";
import { Main } from "./MyComp/Main";
import { NextLogo } from "./MyComp/NextLogo";

export type CompositionRegistryItem<Schema extends z.ZodTypeAny> = {
  id: string;
  component: ComponentType<z.infer<Schema>>;
  schema: Schema;
  defaultProps: z.infer<Schema>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  folder?: string;
  previewEnabled?: boolean;
};

export const compositionRegistry = [
  {
    id: INTRO_COMP_NAME,
    component: IntroComposition,
    schema: IntroCompositionProps,
    defaultProps: defaultIntroProps,
    durationInFrames: INTRO_DURATION_IN_FRAMES,
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    folder: "Base",
    previewEnabled: true,
  },
  {
    id: MAIN_COMP_NAME,
    component: MainComposition,
    schema: MainCompositionProps,
    defaultProps: defaultMainProps,
    durationInFrames: MAIN_DURATION_IN_FRAMES,
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    folder: "Base",
    previewEnabled: true,
  },
  {
    id: OUTRO_COMP_NAME,
    component: OutroComposition,
    schema: OutroCompositionProps,
    defaultProps: defaultOutroProps,
    durationInFrames: OUTRO_DURATION_IN_FRAMES,
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    folder: "Base",
    previewEnabled: true,
  },
  {
    id: FINAL_COMP_NAME,
    component: FinalComposition,
    schema: FinalCompositionProps,
    defaultProps: defaultFinalProps,
    durationInFrames: FINAL_DURATION_IN_FRAMES,
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    folder: "Base",
    previewEnabled: true,
  },
  {
    id: COMP_NAME,
    component: Main,
    schema: MyCompProps,
    defaultProps: defaultMyCompProps,
    durationInFrames: DURATION_IN_FRAMES,
    fps: VIDEO_FPS,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    previewEnabled: true,
  },
  {
    id: NEXT_LOGO_COMP_NAME,
    component: NextLogo,
    schema: NextLogoProps,
    defaultProps: defaultNextLogoProps,
    durationInFrames: 300,
    fps: 30,
    width: 140,
    height: 140,
    previewEnabled: false,
  },
] satisfies CompositionRegistryItem<z.ZodTypeAny>[];

export const getCompositionById = (id: string) =>
  compositionRegistry.find((composition) => composition.id === id);
