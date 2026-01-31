"use client";

import React, { useState } from "react";

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (config: {
    name: string;
  }) => void;
}

export const NewProjectModal = ({ isOpen, onClose, onCreateProject }: NewProjectModalProps) => {
  const [projectName, setProjectName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateProject({
      name: projectName || "Untitled Project",
    });
    // Reset form
    setProjectName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-studio-panel-bg border border-studio-border rounded-lg shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-studio-border">
          <h2 className="text-lg font-semibold text-studio-text">Create New Project</h2>
          <button
            onClick={onClose}
            className="text-studio-text-muted hover:text-studio-text transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-studio-text mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Untitled Project"
              className="w-full px-3 py-2 bg-studio-bg border border-studio-border rounded text-studio-text placeholder-studio-text-muted focus:outline-none focus:ring-2 focus:ring-studio-accent"
              autoFocus
            />
          </div>

          {/* Default settings info */}
          <div className="p-4 bg-studio-bg border border-studio-border rounded">
            <div className="text-sm text-studio-text-muted space-y-1">
              <div>Resolution: <span className="text-studio-text">1280 × 720</span></div>
              <div>Frame Rate: <span className="text-studio-text">30 fps</span></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-studio-text hover:bg-studio-border rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-studio-accent text-white rounded hover:bg-studio-accent-hover transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
