import type { ComponentType } from "react";
import type { Asset, Project } from "./models";

export type RenderRequest = {
  compositionId: string;
  width: number;
  height: number;
  fps: number;
  format: "mp4" | "webm" | "mov";
  quality: "low" | "medium" | "high" | "ultra";
  codec: string;
};

export type RenderRequestContext = {
  request: RenderRequest;
  jobId: string;
};

export type PluginPanel = {
  id: string;
  pluginId: string;
  title: string;
  order?: number;
  Component: ComponentType;
};

export type PluginPanelInput = Omit<PluginPanel, "pluginId"> & {
  pluginId?: string;
};

export type PluginContext = {
  config: Record<string, unknown>;
  registerPanel: (panel: PluginPanelInput) => void;
};

export type Plugin = {
  id: string;
  name: string;
  version?: string;
  setup?: (context: PluginContext) => void;
  onAssetImported?: (asset: Asset) => void | Promise<void>;
  onProjectLoaded?: (project: Project) => void | Promise<void>;
  onRenderRequested?: (
    project: Project | null,
    context: RenderRequestContext,
  ) => void | Promise<void>;
};

export type PluginRegistration = {
  plugin: Plugin;
  enabled?: boolean;
  config?: Record<string, unknown>;
};
