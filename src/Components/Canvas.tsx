import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);

    canvas.width = window.innerWidth * 0.8;  // Adjust as needed
    canvas.height = window.innerHeight * 0.6; // Adjust as needed
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    context.closePath();
  };

  return (
    // <canvas className='bg-white'
    //   ref={canvasRef}
    //   onMouseDown={startDrawing}
    //   onMouseMove={draw}
    //   onMouseUp={stopDrawing}
    //   onMouseLeave={stopDrawing}
    //   style={{ border: '1px solid black' }}
    // />
    <canvas
  className="bg-white"
  ref={canvasRef}
  onMouseDown={startDrawing}
  onMouseMove={draw}
  onMouseUp={stopDrawing}
  onMouseLeave={stopDrawing}
  onTouchStart={(e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    startDrawing({ nativeEvent: { offsetX: x, offsetY: y } });
  }}
  onTouchMove={(e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    draw({ nativeEvent: { offsetX: x, offsetY: y } });
  }}
  onTouchEnd={(e) => {
    e.preventDefault();
    stopDrawing();
  }}
  onTouchCancel={(e) => {
    e.preventDefault();
    stopDrawing();
  }}
  style={{ border: '1px solid black' }}
/>

  );
};

export default DrawingCanvas;
