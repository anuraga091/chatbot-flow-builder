import React from 'react';
import FlowBuilder from './components/FlowBuilder';
import './App.css';

function App() {
  const saveChanges = (flowData) => {
    console.log('Flow Data:', flowData);
  };

  const handleSaveButtonClick = () => {
    const saveEvent = new Event('saveChanges');
    document.getElementById('flow-builder').dispatchEvent(saveEvent);
  };

  return (
    <div className="App">
      <header className="header">
        <button onClick={handleSaveButtonClick} className='save-button'>
          Save Changes
        </button>
      </header>
      <div className="main-container">
        <FlowBuilder saveChanges={saveChanges} />
      </div>
    </div>
  );
}

export default App;
