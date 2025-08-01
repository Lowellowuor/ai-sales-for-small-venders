// ai-sales-frontend/src/components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"
        role="status"
        aria-label="loading"
      >
        {/* Visually hidden text for accessibility */}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
