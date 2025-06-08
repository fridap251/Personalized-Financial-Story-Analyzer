import React from 'react';
import { ProcessedResults } from '../types/financial';
import { PortfolioChart } from './PortfolioChart';
import { TrendingUp, Shield, Target, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';

interface ResultsDashboardProps {
  results: ProcessedResults;
  onStartOver: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, onStartOver }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="text-red-500\" size={16} />;
      case 'medium': return <Target className="text-orange-500" size={16} />;
      default: return <CheckCircle className="text-green-500" size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-orange-200 bg-orange-50';
      default: return 'border-green-200 bg-green-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Financial Plan</h1>
        <div className="flex items-center justify-center gap-4 text-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <span>Personalization Score: {Math.round(results.personalizationScore * 100)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
            <span>Confidence: {Math.round(results.portfolio.confidence * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Portfolio Allocation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="text-blue-600" size={24} />
            Portfolio Allocation
          </h2>
          
          <PortfolioChart allocation={results.portfolio.allocation} />
          
          <div className="mt-6 space-y-3">
            {Object.entries(results.portfolio.reasoning).map(([asset, reasoning]) => (
              <div key={asset} className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 capitalize">
                  {asset.replace(/([A-Z])/g, ' $1')}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{reasoning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Insights */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="text-emerald-600" size={24} />
            Personal Insights
          </h2>
          
          <div className="space-y-4">
            {results.portfolio.personalizedInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-gray-700">{insight}</p>
              </div>
            ))}
          </div>

          {Object.keys(results.storyCompleteness).length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Improve Your Plan</h3>
              <div className="space-y-2">
                {Object.entries(results.storyCompleteness).map(([key, suggestion]) => (
                  <div key={key} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Target className="text-orange-600" size={24} />
          Recommended Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.actions.map((action, index) => (
            <div key={index} className={`p-6 rounded-lg border-2 ${getPriorityColor(action.priority)}`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{action.description}</h3>
                <div className="flex items-center gap-1">
                  {getPriorityIcon(action.priority)}
                  <span className="text-sm font-medium capitalize">{action.priority}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3">{action.reasoning}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-gray-500" />
                  <span className="text-gray-600">Impact: {action.impact}</span>
                </div>
                
                {(action.estimatedSavings || action.estimatedAmount || action.coverageAmount) && (
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-green-600" />
                    <span className="text-green-700 font-medium">
                      {action.estimatedSavings && `Potential savings: $${action.estimatedSavings.toLocaleString()}`}
                      {action.estimatedAmount && `Recommended amount: $${action.estimatedAmount.toLocaleString()}`}
                      {action.coverageAmount && `Coverage needed: $${action.coverageAmount.toLocaleString()}`}
                    </span>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  Story connection: {action.storyConnection}
                </div>
              </div>
              
              <div className="mt-4 bg-white bg-opacity-50 p-3 rounded">
                <p className="text-sm italic text-gray-600">{action.personalizedContext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="text-center pt-6">
        <button
          onClick={onStartOver}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Create Another Plan
        </button>
      </div>
    </div>
  );
};