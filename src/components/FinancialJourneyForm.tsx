import React, { useState } from 'react';
import { FinancialJourney } from '../types/financial';
import { Plus, X } from 'lucide-react';

interface FinancialJourneyFormProps {
  data: FinancialJourney;
  onChange: (data: FinancialJourney) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const FinancialJourneyForm: React.FC<FinancialJourneyFormProps> = ({ 
  data, 
  onChange, 
  onNext, 
  onPrevious 
}) => {
  const [newExperience, setNewExperience] = useState('');
  const [newChallenge, setNewChallenge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addExperience = () => {
    if (newExperience.trim()) {
      onChange({
        ...data,
        pastExperiences: [...data.pastExperiences, newExperience.trim()]
      });
      setNewExperience('');
    }
  };

  const removeExperience = (index: number) => {
    onChange({
      ...data,
      pastExperiences: data.pastExperiences.filter((_, i) => i !== index)
    });
  };

  const addChallenge = () => {
    if (newChallenge.trim()) {
      onChange({
        ...data,
        currentChallenges: [...data.currentChallenges, newChallenge.trim()]
      });
      setNewChallenge('');
    }
  };

  const removeChallenge = (index: number) => {
    onChange({
      ...data,
      currentChallenges: data.currentChallenges.filter((_, i) => i !== index)
    });
  };

  const toggleValue = (value: string) => {
    const values = data.financialValues.includes(value)
      ? data.financialValues.filter(v => v !== value)
      : [...data.financialValues, value];
    onChange({ ...data, financialValues: values });
  };

  const valueOptions = [
    'financial security',
    'family first',
    'long-term thinking',
    'ethical investing',
    'wealth building',
    'debt freedom',
    'retirement planning',
    'flexibility',
    'conservative approach',
    'aggressive growth'
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Journey</h2>
        <p className="text-gray-600">Share your financial experiences and goals to get personalized advice</p>
      </div>

      {/* Money Mindset */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Money Mindset</label>
        <select
          value={data.moneyMindset}
          onChange={(e) => onChange({ ...data, moneyMindset: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          required
        >
          <option value="">Select your mindset</option>
          <option value="growth-oriented">Growth-oriented</option>
          <option value="security-focused">Security-focused</option>
          <option value="balanced">Balanced</option>
          <option value="risk-averse">Risk-averse</option>
          <option value="opportunistic">Opportunistic</option>
        </select>
      </div>

      {/* Risk Tolerance */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
        <div className="grid grid-cols-3 gap-4">
          {['conservative', 'moderate', 'aggressive'].map((risk) => (
            <button
              key={risk}
              type="button"
              onClick={() => onChange({ ...data, riskTolerance: risk })}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                data.riskTolerance === risk
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold capitalize">{risk}</div>
              <div className="text-sm text-gray-600 mt-1">
                {risk === 'conservative' && 'Lower risk, steady returns'}
                {risk === 'moderate' && 'Balanced risk and growth'}
                {risk === 'aggressive' && 'Higher risk, potential for higher returns'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Past Experiences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Past Financial Experiences</label>
        <div className="space-y-3">
          {data.pastExperiences.map((experience, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="flex-1">{experience}</span>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newExperience}
              onChange={(e) => setNewExperience(e.target.value)}
              placeholder="Add a financial experience..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExperience())}
            />
            <button
              type="button"
              onClick={addExperience}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Current Challenges */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Financial Challenges</label>
        <div className="space-y-3">
          {data.currentChallenges.map((challenge, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="flex-1">{challenge}</span>
              <button
                type="button"
                onClick={() => removeChallenge(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newChallenge}
              onChange={(e) => setNewChallenge(e.target.value)}
              placeholder="Add a current challenge..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChallenge())}
            />
            <button
              type="button"
              onClick={addChallenge}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Financial Values */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Financial Values</label>
        <div className="grid grid-cols-2 gap-3">
          {valueOptions.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleValue(value)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                data.financialValues.includes(value)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="capitalize">{value}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2">Select all that apply to you</p>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrevious}
          className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
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