// src/components/CustomNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: 10, borderRadius: 5, border: '1px solid #ddd', background: '#e6f7ff' }}>
      <div style={{ fontWeight: 'bold' }}>{data.label}</div>
      <div>{data.text}</div>
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
