"use client";

import React from "react";
import { KEYBOARD_SHORTCUTS } from "../../hooks/useStudioKeyboardShortcuts";
import { useUIStore } from "../../services/ui-store";

export const KeymapModal: React.FC = () => {
  const { showKeymaps, setShowKeymaps } = useUIStore();

  if (!showKeymaps) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => setShowKeymaps(false)}
    >
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
          <button 
            onClick={() => setShowKeymaps(false)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(KEYBOARD_SHORTCUTS).map(([category, shortcuts]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts.map((shortcut) => (
                  <div key={shortcut.key} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300">{shortcut.description}</span>
                    <kbd className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-100 font-mono text-xs min-w-[2.5rem] text-center">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 text-center">
          <p className="text-xs text-zinc-500">
            Press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded font-mono">?</kbd> to toggle this menu
          </p>
        </div>
      </div>
    </div>
  );
};
