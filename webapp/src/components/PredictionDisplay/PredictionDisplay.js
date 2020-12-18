import React, { useState, useEffect } from 'react';
import './PredictionDisplay.css';
import PredictionResult from '../PredictionResult/PredictionResult';

const PredictionDisplay = () => {
  const [predictions, setPredictions] = useState([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]);

  useEffect(() => {
    const canvas = document.querySelector('.digit-canvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'black';

    let isDrawing = false;
    const coord = { x: 0, y: 0 };

    const updateCoord = (e) => {
      coord.x = e.pageX - canvas.offsetLeft;
      coord.y = e.pageY - canvas.offsetTop;
    };

    const draw = (e) => {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(coord.x, coord.y);
      updateCoord(e);
      ctx.lineTo(coord.x, coord.y);
      ctx.closePath();
      ctx.stroke();
    };

    const onMouseDown = (e) => {
      isDrawing = true;
      updateCoord(e);
    };

    const onStopDraw = (e) => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', onStopDraw);
    canvas.addEventListener('mouseleave', onStopDraw);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', onStopDraw);
      canvas.removeEventListener('mouseleave', onStopDraw);
    };
  }, []);

  const handleClearCanvas = (e) => {
    const canvas = document.querySelector('.digit-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handlePredict = (e) => {
    const canvas = document.querySelector('.digit-canvas');
    const ctx = canvas.getContext('2d');

    // Model expects white digit on black background. Invert the colors before querying our model:
    ctx.save();
    ctx.globalCompositeOperation = 'difference';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    
    // Use the REST API exposed by our Flask server to ask for
    // predictions. The Flask server preprocesses the given
    // image, and sends it to the model hosted by the
    // Tensorflow Server. The Tensorflow Server replies with
    // predictions, which makes it back here to the front end.
    const params = {
      method: "POST",
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify(dataURL)
    };
    
    // Our Flask server sits behind Gunicorn, which is reverse
    // proxied by a proper web server Nginx
    // The reverse proxy also relieves CORS issues.
    const hostname = window.location.hostname;
    const url = `http://${hostname}/mnist/predict/`;

    fetch(url, params)
      .then((res) => res.json())
      .then((result) => {
        const preds = result.predictions[0];
        setPredictions(preds);
      });
  };

  return (
    <div className="prediction-display-container">
      <PredictionResult predictions={predictions} />
      <canvas className="digit-canvas" width="280" height="280"></canvas>
      <div className="digit-controls">
        <button className="digit-control-btn digit-clear-btn" onClick={handleClearCanvas}>Clear</button>
        <button className="digit-control-btn digit-predict-btn" onClick={handlePredict}>Predict</button>
      </div>
    </div>
  )
};

export default PredictionDisplay;