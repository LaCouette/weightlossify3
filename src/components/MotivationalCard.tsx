import React from 'react';
import { Lightbulb } from 'lucide-react';

export function MotivationalCard() {
  const quote = "Small progress is still progress. Keep going!";
  
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
      <div className="flex items-center space-x-3 mb-2">
        <Lightbulb className="h-6 w-6" />
        <h3 className="font-medium">Daily Motivation</h3>
      </div>
      <p className="text-lg font-medium">{quote}</p>
    </div>
  );
}