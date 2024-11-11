import React from 'react';
import { Edit, Save } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionActionsProps {
  isEditing: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function SectionActions({
  isEditing,
  isLoading,
  onEdit,
  onSave,
  onCancel
}: SectionActionsProps) {
  if (!isEditing) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onEdit}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
      >
        <Edit className="h-4 w-4" />
        <span>Edit</span>
      </motion.button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      >
        Cancel
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onSave}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-200 text-indigo-700 rounded-lg shadow-md shadow-purple-100/50 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        <span>{isLoading ? 'Saving...' : 'Save'}</span>
      </motion.button>
    </div>
  );
}