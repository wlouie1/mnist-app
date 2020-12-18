import React from 'react';
import './PredictionResult.css';
import PredictionCard from '../PredictionCard/PredictionCard';

const PredictionResult = (props) => {
  const predCards = props.predictions.map((prob, i) => 
    <PredictionCard key={i.toString()} prediction={prob} value={i} />
  );

  return (
    <div className="prediction-result-container">
      {predCards}
    </div>
  )
};

export default PredictionResult;