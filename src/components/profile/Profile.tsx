import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUserStore } from '../../stores/userStore';
import { UserProfile } from '../../types/profile';

// Import section components
import { ProfileHeader } from './sections/ProfileHeader';
import { BasicInformation } from './sections/BasicInformation';
import { PhysicalMeasurements } from './sections/PhysicalMeasurements';
import { GoalsTargets } from './sections/GoalsTargets';
import { DailyTargets } from './sections/DailyTargets';
import { CalculatedMetrics } from './sections/CalculatedMetrics';
import { ProfileTimestamps } from './sections/ProfileTimestamps';

interface EditingSections {
  basicInfo: boolean;
  physicalMeasurements: boolean;
  goalsTargets: boolean;
  dailyTargets: boolean;
}

export function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { profile, updateProfile } = useUserStore();
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [editingSections, setEditingSections] = useState<EditingSections>({
    basicInfo: false,
    physicalMeasurements: false,
    goalsTargets: false,
    dailyTargets: false
  });

  useEffect(() => {
    if (profile) {
      setEditedProfile(profile);
    }
  }, [profile]);

  const handleRestartSetup = async () => {
    if (!user || isResetting) return;
    
    try {
      setIsResetting(true);
      await updateProfile(user.uid, {
        ...profile,
        setupCompleted: false,
        updatedAt: new Date()
      });
      navigate('/profile-setup');
    } catch (err) {
      setError('Failed to restart profile setup. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: ['age', 'height', 'currentWeight', 'targetWeight', 'dailyStepGoal', 'dailyCaloriesTarget']
          .includes(name) ? Number(value) : value
      };
    });
  };

  const handleSaveSection = async (section: keyof EditingSections) => {
    if (!user || !editedProfile) return;

    try {
      setIsLoading(true);
      setError(null);
      await updateProfile(user.uid, {
        ...editedProfile,
        updatedAt: new Date()
      });
      setEditingSections(prev => ({
        ...prev,
        [section]: false
      }));
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSection = (section: keyof EditingSections) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: false
    }));
    setEditedProfile(profile);
  };

  if (!user || !profile || !editedProfile) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <ProfileHeader
          isResetting={isResetting}
          onRestartSetup={handleRestartSetup}
          error={error}
        />

        <BasicInformation
          profile={editedProfile}
          isEditing={editingSections.basicInfo}
          onChange={handleInputChange}
          onSave={() => handleSaveSection('basicInfo')}
          onCancel={() => handleCancelSection('basicInfo')}
          onEdit={() => setEditingSections(prev => ({ ...prev, basicInfo: true }))}
          isLoading={isLoading}
        />

        <PhysicalMeasurements
          profile={editedProfile}
          isEditing={editingSections.physicalMeasurements}
          onChange={handleInputChange}
          onSave={() => handleSaveSection('physicalMeasurements')}
          onCancel={() => handleCancelSection('physicalMeasurements')}
          onEdit={() => setEditingSections(prev => ({ ...prev, physicalMeasurements: true }))}
          isLoading={isLoading}
        />

        <GoalsTargets
          profile={editedProfile}
          isEditing={editingSections.goalsTargets}
          onChange={handleInputChange}
          onSave={() => handleSaveSection('goalsTargets')}
          onCancel={() => handleCancelSection('goalsTargets')}
          onEdit={() => setEditingSections(prev => ({ ...prev, goalsTargets: true }))}
          isLoading={isLoading}
        />

        <DailyTargets
          profile={editedProfile}
          isEditing={editingSections.dailyTargets}
          onChange={handleInputChange}
          onSave={() => handleSaveSection('dailyTargets')}
          onCancel={() => handleCancelSection('dailyTargets')}
          onEdit={() => setEditingSections(prev => ({ ...prev, dailyTargets: true }))}
          isLoading={isLoading}
        />

        <CalculatedMetrics profile={editedProfile} />

        <ProfileTimestamps
          createdAt={profile.createdAt}
          updatedAt={profile.updatedAt}
        />
      </div>
    </div>
  );
}