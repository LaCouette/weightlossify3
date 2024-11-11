import React from 'react';
import { RefreshCw, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  isResetting: boolean;
  onRestartSetup: () => void;
  error: string | null;
}

export function ProfileHeader({ isResetting, onRestartSetup, error }: ProfileHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="section-header">
        <div className="section-icon">
          <User className="h-6 w-6 text-indigo-600" />
        </div>
        <h1 className="section-title text-shadow">Profile Settings</h1>
        <p className="section-description">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestartSetup}
          disabled={isResetting}
          className="btn btn-warning"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isResetting ? 'animate-spin' : ''}`} />
          <span>{isResetting ? 'Restarting...' : 'Restart Setup Wizard'}</span>
        </motion.button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg shadow-sm"
        >
          <p className="text-sm text-red-600">{error}</p>
        </motion.div>
      )}
    </motion.div>
  );
}