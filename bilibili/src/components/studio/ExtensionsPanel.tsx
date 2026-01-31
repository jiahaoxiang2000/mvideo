"use client";

import { useEffect, useMemo, useState } from "react";
import { getPluginPanels } from "../../services/plugins";

export const ExtensionsPanel = () => {
  const panels = useMemo(
    () =>
      getPluginPanels().sort((a, b) => {
        const orderA = a.order ?? 0;
        const orderB = b.order ?? 0;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        return a.title.localeCompare(b.title);
      }),
    [],
  );

  const [activePanelId, setActivePanelId] = useState<string | null>(
    panels[0]?.id ?? null,
  );

  useEffect(() => {
    if (!activePanelId && panels[0]) {
      setActivePanelId(panels[0].id);
    }
  }, [activePanelId, panels]);

  if (panels.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-studio-text-muted">
        <span>No extensions installed</span>
        <span className="text-xs">Add a plugin to show a panel here.</span>
      </div>
    );
  }

  const activePanel =
    panels.find((panel) => panel.id === activePanelId) ?? panels[0];
  const ActiveComponent = activePanel?.Component;

  return (
    <div className="flex h-full flex-col">
      {panels.length > 1 && (
        <div className="flex border-b border-studio-border bg-studio-panel-header">
          {panels.map((panel) => (
            <button
              key={panel.id}
              onClick={() => setActivePanelId(panel.id)}
              className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                panel.id === activePanelId
                  ? "text-studio-accent border-b-2 border-studio-accent"
                  : "text-studio-text-muted hover:text-studio-text"
              }`}
            >
              {panel.title}
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 min-h-0 overflow-auto">
        {ActiveComponent ? <ActiveComponent /> : null}
      </div>
    </div>
  );
};
