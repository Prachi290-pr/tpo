import React from 'react';

const CircularProgressBar = () => {
  const radius = 50;
  const stroke = 10;
  const percentage = 80;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="block mx-auto animate-spin"
        style={{ animationDuration: '2s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}
      >
        <circle
          stroke="#e2e8f0" // Light gray color
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#3b82f6" // Blue color for the progress
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      
    </div>
  );
};

export default CircularProgressBar;
