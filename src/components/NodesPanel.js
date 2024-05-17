import React from 'react';
import './NodesPanel.css'; 

const nodeTypes = [
  {
    type: 'custom',
    label: 'Message',
    data: { label: 'Send Message', text: 'New Message' },
    icon: '/message-icon.png'
  },
  
];

const NodesPanel = ({ addNode }) => {
  return (
    <div className="nodes-panel">
      <h3>Nodes Panel</h3>
      {nodeTypes.map((nodeType, index) => (
        <div
          key={index}
          className="node-item"
          onClick={() => addNode(nodeType)}
        >
          <img src={nodeType.icon} alt={nodeType.label} className="node-icon" />
          <span className='text-label'>{nodeType.label}</span>
        </div>
      ))}
    </div>
  );
};

export default NodesPanel;
