import React from 'react';

interface FormActionsProps {
  isEditing: boolean;
  isLoading: boolean;
  onCancel: () => void;
}

export function FormActions({ isEditing, isLoading, onCancel }: FormActionsProps) {
  if (!isEditing) return null;

  return (
    <div className="flex justify-end space-x-3">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}