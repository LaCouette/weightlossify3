import React from 'react';
import { User, Edit2, Mail } from 'lucide-react';
import { UserProfile } from '../../../types/profile';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../../stores/authStore';

interface BasicInformationProps {
  profile: UserProfile;
  isEditing: boolean;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

export function BasicInformation({
  profile,
  isEditing,
  isLoading,
  onChange,
  onSave,
  onCancel,
  onEdit
}: BasicInformationProps) {
  const { user } = useAuthStore();

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
        <h2 className="section-title text-shadow">Basic Information</h2>
        <p className="section-description">
          Your personal details help us personalize your experience
        </p>
      </div>

      <div className="space-y-6 max-w-lg mx-auto">
        {/* Email Display */}
        <div className="input-group">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-indigo-500" />
            <label className="input-label">Email Address</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="input-field bg-gray-50 text-gray-600"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={onChange}
            disabled={!isEditing}
            className="input-field"
            placeholder="Enter your full name"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Gender</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={onChange}
            disabled={!isEditing}
            className="input-field"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Age</label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-[120px]">
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={onChange}
                disabled={!isEditing}
                min="13"
                max="120"
                className="input-field text-center"
                placeholder="Age"
              />
            </div>
            <span className="text-sm text-gray-600">years</span>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          {!isEditing ? (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onEdit} 
              className="btn btn-secondary"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Information
            </motion.button>
          ) : (
            <>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCancel} 
                disabled={isLoading}
                className="btn btn-ghost"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSave}
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}