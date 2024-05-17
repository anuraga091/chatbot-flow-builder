// src/components/SettingsPanel.js
import React from 'react';

const SettingsPanel = ({ selectedNode, setNodes, setSelectedNode }) => {
  const updateNodeLabel = (event) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          node.data = { ...node.data, label: event.target.value };
        }
        return node;
      })
    );
  };

  return (
    <div>
      <h3>Settings Panel</h3>
      <input
        type="text"
        value={selectedNode.data.label}
        onChange={updateNodeLabel}
        placeholder="Label"
      />
      <input
        type="text"
        value={selectedNode.data.text}
        onChange={(e) => updateNodeLabel({ target: { value: e.target.value, name: 'text' } })}
        placeholder="Text"
      />
      <button onClick={() => setSelectedNode(null)}>Close</button>
    </div>
  );
};

export default SettingsPanel;
