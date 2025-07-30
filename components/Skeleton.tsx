
import React from 'react';

export const SkeletonLine: React.FC<{ width?: string; height?: string; className?: string }> = ({ width = '100%', height = '1rem', className='' }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} style={{ width, height }}></div>
);

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-48 md:h-56 bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <SkeletonLine height="1.25rem" width="80%" className="mb-3" />
        <SkeletonLine height="1.5rem" width="50%" className="mb-4" />
        <SkeletonLine height="2.5rem" />
      </div>
    </div>
  );
};
