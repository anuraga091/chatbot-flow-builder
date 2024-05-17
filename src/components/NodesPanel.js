import React from 'react';

const nodeTypes = [
  {
    type: 'custom',
    label: 'Message Node',
    data: { label: 'Send Message', text: 'New Message' }
  },
  // Add more node types here as needed
];

const NodesPanel = ({ addNode }) => {
  return (
    <div style={{ width: '200px', borderRight: '1px solid #ddd', padding: '10px' }}>
      <h3>Nodes Panel</h3>
      {nodeTypes.map((nodeType, index) => (
        <div
          key={index}
          style={{
            cursor: 'pointer',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginBottom: '10px',
            textAlign: 'center',
          }}
          onClick={() => addNode(nodeType)}
        >
          {nodeType.label}
        </div>
      ))}
    </div>
  );
};

export default NodesPanel;
