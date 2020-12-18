import React from 'react';
import './PredictionCard.css';

const PredictionCard = (props) => {
  const style = {
    'color': props.prediction > 0.5 ? 'white' : 'initial',
    'backgroundColor': `rgba(14, 52, 107, ${props.prediction.toString()})`
  }
  return (
    <div className="prediction-card" style={style}>
      {props.value}
    </div>
  )
};

export default PredictionCard;