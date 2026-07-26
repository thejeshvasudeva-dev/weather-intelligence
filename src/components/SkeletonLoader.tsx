import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Current Weather Card Skeleton */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 h-80 space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-slate-800/80 rounded-xl" />
          <div className="h-6 w-32 bg-slate-800/80 rounded-xl" />
        </div>
        <div className="h-20 w-40 bg-slate-800/80 rounded-2xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="h-16 bg-slate-800/80 rounded-2xl" />
          <div className="h-16 bg-slate-800/80 rounded-2xl" />
          <div className="h-16 bg-slate-800/80 rounded-2xl" />
          <div className="h-16 bg-slate-800/80 rounded-2xl" />
        </div>
      </div>

      {/* Hourly Timeline Skeleton */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 h-48 space-y-4">
        <div className="h-6 w-36 bg-slate-800/80 rounded-xl" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="w-24 h-28 bg-slate-800/80 rounded-2xl shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Intelligence & 7-Day Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 h-96" />
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 h-96" />
      </div>
    </div>
  );
};
