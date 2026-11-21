import React from 'react';

export default function LoadingState({ message = "Loading agricultural data..." }) {
  return (
    <div className="py-12 flex flex-col items-center justify-center space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-km-sage border-t-transparent animate-spin" />
      <span className="text-xs text-km-subtext font-medium">{message}</span>
    </div>
  );
}
