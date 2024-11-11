import React from 'react';
import { Plus } from 'lucide-react';

export default function DailyLog() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Today's Log</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700">
          <Plus className="h-5 w-5" />
          <span>Add Entry</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Weight</p>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-purple-500"
              placeholder="82.5"
              step="0.1"
            />
            <p className="text-xs text-gray-500 mt-1">kg</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Body Fat</p>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-purple-500"
              placeholder="20.5"
              step="0.1"
            />
            <p className="text-xs text-gray-500 mt-1">%</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Steps</p>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-purple-500"
              placeholder="8000"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Calories</p>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-purple-500"
              placeholder="2000"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Exercise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              className="p-2 border rounded focus:ring-2 focus:ring-purple-500"
              placeholder="Exercise type"
            />
            <input
              type="number"
              className="p-2 border rounded focus:ring-2 focus:ring-purple-500"
              placeholder="Duration (minutes)"
            />
            <select className="p-2 border rounded focus:ring-2 focus:ring-purple-500">
              <option value="">Select intensity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Sleep</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              className="p-2 border rounded focus:ring-2 focus:ring-purple-500"
              placeholder="Hours of sleep"
              step="0.5"
            />
            <select className="p-2 border rounded focus:ring-2 focus:ring-purple-500">
              <option value="">Sleep quality</option>
              <option value="1">Poor</option>
              <option value="2">Fair</option>
              <option value="3">Good</option>
              <option value="4">Very Good</option>
              <option value="5">Excellent</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}