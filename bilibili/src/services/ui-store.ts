import { create } from "zustand";
import { DockId, PanelState } from "../../types/layout";

type UIState = {
  panels: PanelState[];
  showKeymaps: boolean;
  togglePanelCollapse: (panelId: string) => void;
  setPanelDock: (panelId: string, dock: DockId) => void;
  toggleKeymaps: () => void;
  setShowKeymaps: (show: boolean) => void;
};

const defaultPanels: PanelState[] = [
  { id: "assets", title: "Assets", dock: "left", collapsed: false },
  { id: "preview", title: "Preview", dock: "center", collapsed: false },
  { id: "timeline", title: "Timeline", dock: "bottom", collapsed: false },
  { id: "inspector", title: "Inspector", dock: "right", collapsed: false },
  { id: "export", title: "Export", dock: "right", collapsed: false },
  { id: "extensions", title: "Extensions", dock: "right", collapsed: false },
];

export const useUIStore = create<UIState>((set) => ({
  panels: defaultPanels,
  showKeymaps: false,
  togglePanelCollapse: (panelId) =>
    set((state) => ({
      panels: state.panels.map((panel) =>
        panel.id === panelId ? { ...panel, collapsed: !panel.collapsed } : panel
      ),
    })),
  setPanelDock: (panelId, dock) =>
    set((state) => ({
      panels: state.panels.map((panel) =>
        panel.id === panelId ? { ...panel, dock } : panel
      ),
    })),
  toggleKeymaps: () => set((state) => ({ showKeymaps: !state.showKeymaps })),
  setShowKeymaps: (show) => set({ showKeymaps: show }),
}));
