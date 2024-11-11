import React from 'react';
import { FormData } from '../../../types/profile';
import { User, Calendar, UserCircle2 } from 'lucide-react';

interface Step1Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function Step1({ formData, onChange }: Step1Props) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Let's start with some basic information about you. This helps us create a personalized plan that fits your needs.
        </p>
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <label className="block font-bold text-gray-900">Your Name</label>
          </div>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={onChange}
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Gender Field */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <UserCircle2 className="h-5 w-5 text-purple-600" />
            </div>
            <label className="block font-bold text-gray-900">Gender</label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'male', label: 'Male', icon: UserCircle2 },
              { value: 'female', label: 'Female', icon: UserCircle2 }
            ].map(({ value, label, icon: Icon }) => (
              <label
                key={value}
                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.gender === value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={value}
                  checked={formData.gender === value}
                  onChange={onChange}
                  className="sr-only"
                />
                <Icon className={`h-6 w-6 ${
                  formData.gender === value ? 'text-purple-600' : 'text-gray-400'
                }`} />
                <span className={`mt-2 text-sm font-medium ${
                  formData.gender === value ? 'text-purple-600' : 'text-gray-600'
                }`}>
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Age Field */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <label className="block font-bold text-gray-900">Age</label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="number"
              name="age"
              required
              min="13"
              max="120"
              value={formData.age || ''}
              onChange={onChange}
              placeholder="Enter your age"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <span className="text-sm text-gray-500 min-w-[60px]">years</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Your age helps us calculate your metabolic rate and energy needs accurately.
          </p>
        </div>
      </div>
    </div>
  );
}