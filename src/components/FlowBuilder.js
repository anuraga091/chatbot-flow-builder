import React, { useState, useCallback, useEffect } from 'react';
import './../App.css'
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialNodes = [
  {
    id: '1',
    type: 'textUpdater',
    data: { label: 'Send Message', text: 'new message' },
    position: { x: 250, y: 5 },
  },
];

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const FlowBuilder = ({ saveChanges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [messageCounter, setMessageCounter] = useState(1);

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

  const onNodeClick = (event, node) => {
    event.stopPropagation();
    setSelectedNode(node);
  };

  const handleSaveChanges = () => {
    const nodesWithEmptyTargetHandles = nodes.filter((node) => {
      const targetEdges = edges.filter((edge) => edge.target === node.id);
      return targetEdges.length === 0;
    });

    if (nodesWithEmptyTargetHandles.length > 1) {
        toast.error("More than one node has empty target handles.")
      
    } else {
      
      const flowData = { nodes, edges };
      localStorage.setItem('flowData', JSON.stringify(flowData));
      saveChanges(flowData);
      toast("Flow Data Successfully Saved")
      
    }
  };

  // Listen for the save event from App
  useEffect(() => {
    const handleSaveEvent = () => {
      handleSaveChanges();
    };

    const builder = document.getElementById('flow-builder');
    builder.addEventListener('saveChanges', handleSaveEvent);

    return () => {
      builder.removeEventListener('saveChanges', handleSaveEvent);
    };
  }, [nodes, edges]);

  const addNode = (nodeType) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: nodeType.type,
      position: { x: Math.random() * 250 + 100, y: Math.random() * 250 + 100 },
      data: { ...nodeType.data, text: `New Message ${messageCounter}` },
    };
    setMessageCounter((prevCounter) => prevCounter + 1);
    setNodes((nds) => nds.concat(newNode));
  };


  return (
    <div id="flow-builder" className='flow-builder-div' >
      <NodesPanel addNode={addNode} />
      <div className='container'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onPaneClick={() => setSelectedNode(null)}
        >
          <Controls />
          <Background />
        </ReactFlow>
        <ToastContainer 
            position="top-center"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            
        />
      </div>
      {selectedNode && (
        <div className='selected-node' >
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
