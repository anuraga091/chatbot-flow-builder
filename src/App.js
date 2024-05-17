import React from 'react';
import FlowBuilder from './components/FlowBuilder';
import './App.css';

function App() {
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

  return (
    <div className="App">
      <header className="header">
        <button onClick={saveChanges}>
          Save Changes
        </button>
      </header>
      <div className="main-container">
        <FlowBuilder />
      </div>
    </div>
  );
}

export default App;
