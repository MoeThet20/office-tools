import React from 'react';
import type { Tool } from '../types';

interface NavigationProps {
  tools: Tool[];
  currentToolId: string;
  onToolSelect: (toolId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ tools, currentToolId, onToolSelect }) => {
  return (
    <nav className="bg-white rounded-xl p-8 shadow-2xl mb-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          Office Tools
        </h1>
        <p className="text-gray-600 text-base">Productivity utilities for your workflow</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl cursor-pointer transition-all duration-300 text-base font-semibold border-2 border-transparent ${
              tool.id === currentToolId
                ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-lg -translate-y-0.5 shadow-[#667eea]/40'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-md'
            }`}
            onClick={() => onToolSelect(tool.id)}
          >
            <span className="text-2xl flex items-center justify-center">{tool.icon}</span>
            <span className="flex-1 text-left">{tool.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
