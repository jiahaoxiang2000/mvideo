import type { Asset, Project } from "../../types/models";
import type {
  Plugin,
  PluginContext,
  PluginPanel,
  PluginPanelInput,
  PluginRegistration,
  RenderRequestContext,
} from "../../types/plugin";
import { pluginConfig } from "../plugins";

type RegisteredPlugin = {
  plugin: Plugin;
  config: Record<string, unknown>;
};

const registeredPlugins: RegisteredPlugin[] = [];
const registeredPanels: PluginPanel[] = [];
let loaded = false;

const normalizePanelId = (pluginId: string, panelId: string) =>
  panelId.includes(":") ? panelId : `${pluginId}:${panelId}`;

const registerPanelInternal = (panel: PluginPanel) => {
  if (registeredPanels.some((existing) => existing.id === panel.id)) {
    return;
  }

  registeredPanels.push(panel);
};

export const registerPlugin = (registration: PluginRegistration) => {
  const { plugin, enabled = true, config = {} } = registration;

  if (!enabled) {
    return;
  }

  if (registeredPlugins.some((entry) => entry.plugin.id === plugin.id)) {
    return;
  }

  const context: PluginContext = {
    config,
    registerPanel: (panelInput: PluginPanelInput) => {
      const id = normalizePanelId(plugin.id, panelInput.id);

      registerPanelInternal({
        ...panelInput,
        id,
        pluginId: panelInput.pluginId ?? plugin.id,
      } as PluginPanel);
    },
  };

  registeredPlugins.push({ plugin, config });
  plugin.setup?.(context);
};

export const loadPlugins = () => {
  if (loaded) {
    return;
  }

  loaded = true;
  pluginConfig.forEach(registerPlugin);
};

export const getPlugins = () => {
  loadPlugins();
  return registeredPlugins.map((entry) => entry.plugin);
};

export const getPluginPanels = () => {
  loadPlugins();
  return registeredPanels.slice();
};

export const runOnAssetImported = async (asset: Asset) => {
  loadPlugins();

  for (const { plugin } of registeredPlugins) {
    if (plugin.onAssetImported) {
      await plugin.onAssetImported(asset);
    }
  }
};

export const runOnProjectLoaded = async (project: Project) => {
  loadPlugins();

  for (const { plugin } of registeredPlugins) {
    if (plugin.onProjectLoaded) {
      await plugin.onProjectLoaded(project);
    }
  }
};

export const runOnRenderRequested = async (
  project: Project | null,
  context: RenderRequestContext,
) => {
  loadPlugins();

  for (const { plugin } of registeredPlugins) {
    if (plugin.onRenderRequested) {
      await plugin.onRenderRequested(project, context);
    }
  }
};
