// src/modules/playground/PlaygroundPanel.tsx

import React from 'react';
import { NexusPanel } from '../nexus';

const PlaygroundPanel: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#020617',
      }}
    >
      <NexusPanel />
    </div>
  );
};

export default PlaygroundPanel;
