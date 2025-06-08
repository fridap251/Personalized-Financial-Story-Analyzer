import React from 'react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps, stepTitles }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {index > 0 && (
                <div className={`flex-1 h-1 ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                ${index === currentStep ? 'ring-4 ring-blue-200' : ''}
                transition-all duration-300
              `}>
                {index + 1}
              </div>
              {index < stepTitles.length - 1 && (
                <div className={`flex-1 h-1 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
            <span className={`
              mt-2 text-sm font-medium text-center
              ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}
            `}>
              {title}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
    </div>
  );
};