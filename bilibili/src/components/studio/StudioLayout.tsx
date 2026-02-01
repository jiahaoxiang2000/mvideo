'use client';

import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

interface StudioLayoutProps {
  toolbar: React.ReactNode;
  resources: React.ReactNode;
  preview: React.ReactNode;
  inspector: React.ReactNode;
  timeline: React.ReactNode;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({
  toolbar,
  resources,
  preview,
  inspector,
  timeline,
}) => {
  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-200 overflow-hidden">
      {/* Toolbar */}
      <div className="h-12 border-b border-zinc-800 flex items-center px-4 shrink-0">
        {toolbar}
      </div>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="vertical">
          <Panel defaultSize={70} minSize={30}>
            <PanelGroup direction="horizontal">
              {/* Left Panel: Resources */}
              <Panel defaultSize={20} minSize={15}>
                <div className="h-full border-r border-zinc-800 overflow-y-auto">
                  {resources}
                </div>
              </Panel>
              
              <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-blue-500 transition-colors" />

              {/* Center Panel: Preview */}
              <Panel defaultSize={60} minSize={30}>
                <div className="h-full flex flex-col items-center justify-center bg-zinc-900">
                  {preview}
                </div>
              </Panel>

              <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-blue-500 transition-colors" />

              {/* Right Panel: Inspector */}
              <Panel defaultSize={20} minSize={15}>
                <div className="h-full border-l border-zinc-800 overflow-y-auto">
                  {inspector}
                </div>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="h-1 bg-zinc-800 hover:bg-blue-500 transition-colors" />

          {/* Bottom Panel: Timeline */}
          <Panel defaultSize={30} minSize={10}>
            <div className="h-full border-t border-zinc-800 overflow-hidden">
              {timeline}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
