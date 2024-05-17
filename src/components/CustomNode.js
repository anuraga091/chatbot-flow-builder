import React from 'react';
import { Handle, Position } from 'reactflow';
import './../App.css'

const CustomNode = ({ data }) => {
  return (
    <div className='custom-node-container'>
      <div className='data-label'>{data.label}</div>
      <div className='data-text'>{data.text}</div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        id="target"
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
        id="source"
        isValidConnection={(connection) => {
          const sourceHandleConnections = document.querySelectorAll(`path.react-flow__edge-path[id^="reactflow__edge-${connection.source}"]`);
          return sourceHandleConnections.length === 0;
        }}
      />
    </div>
  );
};

export default CustomNode;
