// src/App.js

import React from 'react';
import { VortexProvider } from './context/VortexContext';
import { MainLayout } from './components/MainLayout';
// Import Global Styles if you have them
import './App.css'; 

function App() {
  return (
    <VortexProvider>
      <div className="app-container">
        {/* You can place your persistent HUD elements here if you want them always visible */}
        {/* <CodexHUD /> */}
        
        <MainLayout />
        
      </div>
    </VortexProvider>
  );
}

export default App;