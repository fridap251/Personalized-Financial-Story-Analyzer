import React from 'react';
import { PersonalBackground } from '../types/financial';

interface PersonalBackgroundFormProps {
  data: PersonalBackground;
  onChange: (data: PersonalBackground) => void;
  onNext: () => void;
}

export const PersonalBackgroundForm: React.FC<PersonalBackgroundFormProps> = ({ data, onChange, onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Background</h2>
        <p className="text-gray-600">Tell us about yourself to personalize your financial recommendations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            value={data.age || ''}
            onChange={(e) => onChange({ ...data, age: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Enter your age"
            min="18"
            max="100"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income ($)</label>
          <input
            type="number"
            value={data.income || ''}
            onChange={(e) => onChange({ ...data, income: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Enter annual income"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
          <select
            value={data.maritalStatus}
            onChange={(e) => onChange({ ...data, maritalStatus: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          >
            <option value="">Select status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Children</label>
          <input
            type="number"
            value={data.children || 0}
            onChange={(e) => onChange({ ...data, children: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            min="0"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
          <select
            value={data.education}
            onChange={(e) => onChange({ ...data, education: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          >
            <option value="">Select education</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's Degree</option>
            <option value="Master's">Master's Degree</option>
            <option value="PhD">PhD</option>
            <option value="Professional">Professional Degree</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Career Stage</label>
          <select
            value={data.careerStage}
            onChange={(e) => onChange({ ...data, careerStage: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          >
            <option value="">Select career stage</option>
            <option value="early-career">Early Career (0-5 years)</option>
            <option value="mid-career">Mid Career (5-15 years)</option>
            <option value="late-career">Late Career (15+ years)</option>
            <option value="pre-retirement">Pre-retirement</option>
            <option value="retired">Retired</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
        <select
          value={data.industry}
          onChange={(e) => onChange({ ...data, industry: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          required
        >
          <option value="">Select industry</option>
          <option value="technology">Technology</option>
          <option value="healthcare">Healthcare</option>
          <option value="finance">Finance</option>
          <option value="education">Education</option>
          <option value="consulting">Consulting</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="retail">Retail</option>
          <option value="government">Government</option>
          <option value="non-profit">Non-profit</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Continue
        </button>
      </div>
    </form>
  );
};