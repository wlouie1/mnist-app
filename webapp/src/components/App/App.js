import React from 'react';
import './App.css';
import PredictionDisplay from '../../components/PredictionDisplay/PredictionDisplay'

const App = () => {
  return (
    <div className="app">
      <div className="app-title">Digit Recognizer</div>
      <p>Draw a digit in the box below and hit 'Predict'</p>
      <div className="app-h-divider">
        <div className="app-shadow"></div>
      </div>
      <PredictionDisplay />
    </div>
  )
};

export default App;