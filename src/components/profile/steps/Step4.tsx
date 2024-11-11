import React from 'react';
import { FormData } from '../../../types/profile';
import { Activity, Scale, Target, BarChart, Ruler, TrendingUp } from 'lucide-react';
import {
  calculateBMR,
  calculateBMI,
  calculateIdealWeight,
  calculateMaxMuscularPotential,
  getBMICategory
} from '../../../utils/calculations';

interface Step4Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function Step4({ formData }: Step4Props) {
  const height = Number(formData.height);
  const weight = Number(formData.currentWeight);
  const age = Number(formData.age);
  const bodyFat = Number(formData.bodyFat);

  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age, formData.gender, bodyFat);
  const idealWeights = calculateIdealWeight(height);
  const muscularPotential = calculateMaxMuscularPotential(height);
  const bmiCategory = getBMICategory(bmi);

  // Calculate Lean Body Mass
  const leanBodyMass = weight * (1 - bodyFat / 100);

  const bmiCategories = [
    { range: '< 18.5', label: 'Underweight', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { range: '18.5 – 24.9', label: 'Normal', color: 'text-green-600', bgColor: 'bg-green-100' },
    { range: '25 – 29.9', label: 'Overweight', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { range: '≥ 30', label: 'Obese', color: 'text-red-600', bgColor: 'bg-red-100' }
  ];

  const currentBmiCategory = bmiCategories.find(cat => cat.label === bmiCategory);

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6">
      {/* Current Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Height</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">{height} cm</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Weight</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">{weight} kg</div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-900">BMR</span>
          </div>
          <div className="text-2xl font-bold text-emerald-700">{Math.round(bmr)}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-900">Lean Mass</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">{Math.round(leanBodyMass)} kg</div>
        </div>
      </div>

      {/* BMI Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
            <BarChart className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Body Mass Index (BMI)</h3>
            <p className="text-sm text-gray-600">A measure of body fat based on height and weight</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className={`text-5xl font-bold ${currentBmiCategory?.color}`}>
              {bmi.toFixed(1)}
            </div>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${currentBmiCategory?.bgColor} ${currentBmiCategory?.color}`}>
              {bmiCategory}
            </div>
          </div>

          <div className="space-y-2">
            {bmiCategories.map(({ range, label, color, bgColor }) => (
              <div 
                key={label}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  label === bmiCategory ? bgColor : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium text-gray-600">{range}</span>
                <span className={`text-sm font-medium ${label === bmiCategory ? color : 'text-gray-500'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Ideal Weight Range */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Ideal Weight Range</h3>
              <p className="text-sm text-gray-600">Based on different formulas</p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(idealWeights).map(([formula, weight]) => (
              <div key={formula} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-sm font-medium text-gray-600">
                      {formula.charAt(0).toUpperCase() + formula.slice(1)} Formula
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{weight} kg</div>
                  </div>
                  <div className={`w-2 h-8 rounded-full ${
                    Math.abs(weight - formData.currentWeight) <= 5 ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all"
                    style={{
                      width: `${Math.min((formData.currentWeight / weight) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Muscular Potential */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Muscular Potential</h3>
              <p className="text-sm text-gray-600">Maximum lean mass at different body fat levels</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: '5% Body Fat', value: muscularPotential.at5, color: 'bg-red-500', lightColor: 'bg-red-50', textColor: 'text-red-700' },
              { label: '10% Body Fat', value: muscularPotential.at10, color: 'bg-orange-500', lightColor: 'bg-orange-50', textColor: 'text-orange-700' },
              { label: '15% Body Fat', value: muscularPotential.at15, color: 'bg-green-500', lightColor: 'bg-green-50', textColor: 'text-green-700' }
            ].map(({ label, value, color, lightColor, textColor }) => (
              <div key={label} className={`${lightColor} rounded-lg p-4 border border-gray-200`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-medium ${textColor}`}>{label}</span>
                  <span className="text-2xl font-bold text-gray-900">{value} kg</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${color} transition-all`}
                    style={{
                      width: `${(value / muscularPotential.at15) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}