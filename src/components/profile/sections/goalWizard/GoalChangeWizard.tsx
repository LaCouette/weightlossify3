import React, { useState } from 'react';
import { UserProfile } from '../../../../types/profile';
import { GoalSelection } from './steps/GoalSelection';
import { WeightLossPlan } from './steps/WeightLossPlan';
import { TargetAdjustment } from './steps/TargetAdjustment';

interface GoalChangeWizardProps {
  currentProfile: UserProfile;
  onComplete: (updatedProfile: Partial<UserProfile>) => void;
  onCancel: () => void;
}

export function GoalChangeWizard({ currentProfile, onComplete, onCancel }: GoalChangeWizardProps) {
  const [step, setStep] = useState(1);
  const [updatedProfile, setUpdatedProfile] = useState<UserProfile>({
    ...currentProfile,
    primaryGoal: currentProfile.primaryGoal,
    weeklyWeightGoal: currentProfile.weeklyWeightGoal,
    targetWeight: currentProfile.targetWeight,
    dailyStepsGoal: currentProfile.dailyStepsGoal,
    dailyCaloriesTarget: currentProfile.dailyCaloriesTarget
  });

  const handleNext = () => {
    if (step === getMaxSteps()) {
      onComplete(updatedProfile);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      onCancel();
    } else {
      setStep(prev => prev - 1);
    }
  };

  const getMaxSteps = () => {
    if (updatedProfile.primaryGoal === 'weight_loss') {
      return 3; // Goal selection -> Weight loss plan -> Target adjustment
    }
    return 2; // Goal selection -> Target adjustment
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <GoalSelection
            currentGoal={updatedProfile.primaryGoal}
            onChange={(goal) => {
              setUpdatedProfile(prev => ({
                ...prev,
                primaryGoal: goal,
                // Reset related fields when changing goal
                weeklyWeightGoal: undefined,
                targetWeight: undefined
              }));
            }}
          />
        );
      case 2:
        if (updatedProfile.primaryGoal === 'weight_loss') {
          return (
            <WeightLossPlan
              currentWeight={updatedProfile.currentWeight}
              currentPlan={updatedProfile.weeklyWeightGoal}
              onChange={(plan, targetWeight) => {
                setUpdatedProfile(prev => ({
                  ...prev,
                  weeklyWeightGoal: plan,
                  targetWeight
                }));
              }}
            />
          );
        }
        return (
          <TargetAdjustment
            profile={updatedProfile}
            onChange={(updates) => {
              setUpdatedProfile(prev => ({
                ...prev,
                ...updates
              }));
            }}
          />
        );
      case 3:
        return (
          <TargetAdjustment
            profile={updatedProfile}
            onChange={(updates) => {
              setUpdatedProfile(prev => ({
                ...prev,
                ...updates
              }));
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center">Change Your Goal</h2>
        <div className="mt-2 flex justify-center">
          <div className="flex items-center space-x-2">
            {Array.from({ length: getMaxSteps() }).map((_, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div className={`h-1 w-8 rounded ${
                    index < step ? 'bg-indigo-600' : 'bg-gray-200'
                  }`} />
                )}
                <div className={`h-4 w-4 rounded-full ${
                  index < step ? 'bg-indigo-600' : 'bg-gray-200'
                }`} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {renderStep()}

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {step === getMaxSteps() ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
}