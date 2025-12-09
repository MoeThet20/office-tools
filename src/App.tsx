import React, { useState, useEffect } from 'react';
import type { Tool } from './types';
import { Navigation } from './components/Navigation';
import { LogExtractor } from './tools/log-extractor';
import { EncryptionTool } from './tools/encryption-tool';

const tools: Tool[] = [
  {
    id: 'log-extractor',
    name: 'Log Extractor',
    description: 'Extract log text from JSON data',
    icon: '📋',
  },
  {
    id: 'encryption-tool',
    name: 'Encryption Tool',
    description: 'Encrypt text using AES-256',
    icon: '🔐',
  },
];

export const App: React.FC = () => {
  const [currentToolId, setCurrentToolId] = useState<string>('log-extractor');

  useEffect(() => {
    // Load tool from URL hash if present
    const hash = window.location.hash.slice(1);
    if (hash && tools.some((tool) => tool.id === hash)) {
      setCurrentToolId(hash);
    }

    // Handle hash changes for back/forward navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && tools.some((tool) => tool.id === hash)) {
        setCurrentToolId(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleToolSelect = (toolId: string) => {
    setCurrentToolId(toolId);
    window.location.hash = toolId;
  };

  const renderTool = () => {
    switch (currentToolId) {
      case 'log-extractor':
        return <LogExtractor />;
      case 'encryption-tool':
        return <EncryptionTool />;
      default:
        return (
          <div className="card">
            <h2>Tool not found</h2>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Navigation tools={tools} currentToolId={currentToolId} onToolSelect={handleToolSelect} />
      {renderTool()}
    </div>
  );
};
