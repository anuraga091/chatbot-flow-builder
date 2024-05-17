import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Send Message', text: 'Hello World' },
    position: { x: 250, y: 5 }
  }
];

const nodeTypes = {
  custom: CustomNode
};

const edgeTypes = {
  custom: CustomEdge
};

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedFlow = JSON.parse(localStorage.getItem('flowData'));
    if (savedFlow) {
      setNodes(savedFlow.nodes);
      setEdges(savedFlow.edges);
    }
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'custom' }, eds)),
    [setEdges]
  );

  const onEdgeClick = (event, edge) => {
    event.stopPropagation();
    setSelectedNode(null);
  };

  const onNodeClick = (event, node) => {
    event.stopPropagation();
    setSelectedNode(node);
  };

  const saveChanges = () => {
    const nodesWithEmptyTargetHandles = nodes.filter((node) => {
      const targetEdges = edges.filter((edge) => edge.target === node.id);
      return targetEdges.length === 0;
    });

    if (nodesWithEmptyTargetHandles.length > 1) {
      setError('Error: More than one node has empty target handles.');
    } else {
      setError('');
      const flowData = { nodes, edges };
      localStorage.setItem('flowData', JSON.stringify(flowData));
      console.log('Saved Flow Data:', flowData);
    }
  };

  const addNode = (nodeType) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: nodeType.type,
      position: { x: Math.random() * 250 + 100, y: Math.random() * 250 + 100 },
      data: nodeType.data,
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div id="flow-builder" style={{ display: 'flex', height: '100vh', flexGrow: 1 }}>
      <NodesPanel addNode={addNode} />
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onPaneClick={() => setSelectedNode(null)}
        >
          <Controls />
          <Background />
        </ReactFlow>
        {error && <div style={{ color: 'red', position: 'absolute', top: 10, right: 200 }}>{error}</div>}
      </div>
      {selectedNode && (
        <div style={{ width: '300px', background: '#fff', borderLeft: '1px solid #ddd', padding: '10px', position: 'relative' }}>
          <SettingsPanel
            selectedNode={selectedNode}
            setNodes={setNodes}
            setSelectedNode={setSelectedNode}
          />
        </div>
      )}
    </div>
  );
};

export default FlowBuilder;
