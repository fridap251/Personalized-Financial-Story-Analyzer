import React, { useState } from 'react';
import { FormProgress } from './components/FormProgress';
import { PersonalBackgroundForm } from './components/PersonalBackgroundForm';
import { FinancialJourneyForm } from './components/FinancialJourneyForm';
import { LifeEventsForm } from './components/LifeEventsForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { FinancialStoryProcessor } from './utils/storyProcessor';
import { FinancialStory, PersonalBackground, FinancialJourney, LifeEvent, ProcessedResults } from './types/financial';
import { BarChart3, TrendingUp, Shield } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<ProcessedResults | null>(null);
  
  // Form data state
  const [personalBackground, setPersonalBackground] = useState<PersonalBackground>({
    maritalStatus: '',
    children: 0,
    age: 0,
    education: '',
    careerStage: '',
    industry: '',
    income: 0
  });

  const [financialJourney, setFinancialJourney] = useState<FinancialJourney>({
    moneyMindset: '',
    pastExperiences: [],
    currentChallenges: [],
    financialValues: [],
    riskTolerance: ''
  });

  const [upcomingEvents, setUpcomingEvents] = useState<LifeEvent[]>([]);
  const [majorEvents, setMajorEvents] = useState<LifeEvent[]>([]);

  const stepTitles = ['Personal Info', 'Financial Journey', 'Life Events', 'Your Plan'];

  const processor = new FinancialStoryProcessor();

  const handleNext = () => {
    if (currentStep < stepTitles.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const story: FinancialStory = {
      personalBackground,
      financialJourney,
      lifeEventsUpcoming: upcomingEvents,
      lifeEventsMajor: majorEvents,
      preferences: {}
    };

    const processedResults = processor.processStory(story);
    setResults(processedResults);
    setCurrentStep(3);
  };

  const handleStartOver = () => {
    setCurrentStep(0);
    setResults(null);
    setPersonalBackground({
      maritalStatus: '',
      children: 0,
      age: 0,
      education: '',
      careerStage: '',
      industry: '',
      income: 0
    });
    setFinancialJourney({
      moneyMindset: '',
      pastExperiences: [],
      currentChallenges: [],
      financialValues: [],
      riskTolerance: ''
    });
    setUpcomingEvents([]);
    setMajorEvents([]);
  };

  if (results && currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-8 px-4">
        <ResultsDashboard results={results} onStartOver={handleStartOver} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BarChart3 className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Story Analyzer</h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Get personalized investment recommendations based on your unique financial story
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 px-4">
        {currentStep < 3 && (
          <FormProgress 
            currentStep={currentStep} 
            totalSteps={stepTitles.length} 
            stepTitles={stepTitles}
          />
        )}

        <div className="max-w-4xl mx-auto">
          {currentStep === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <PersonalBackgroundForm
                data={personalBackground}
                onChange={setPersonalBackground}
                onNext={handleNext}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <FinancialJourneyForm
                data={financialJourney}
                onChange={setFinancialJourney}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <LifeEventsForm
                upcomingEvents={upcomingEvents}
                majorEvents={majorEvents}
                onUpcomingChange={setUpcomingEvents}
                onMajorChange={setMajorEvents}
                onNext={handleComplete}
                onPrevious={handlePrevious}
              />
            </div>
          )}
        </div>

        {/* Feature highlights for first step */}
        {currentStep === 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Personalized Portfolios</h3>
                <p className="text-gray-600 text-sm">
                  Get investment allocations tailored to your unique story and circumstances
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex p-3 bg-emerald-100 rounded-full mb-4">
                  <Shield className="text-emerald-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Risk-Aware Planning</h3>
                <p className="text-gray-600 text-sm">
                  Recommendations account for your past experiences and comfort with risk
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex p-3 bg-orange-100 rounded-full mb-4">
                  <BarChart3 className="text-orange-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Actionable Insights</h3>
                <p className="text-gray-600 text-sm">
                  Receive specific action items prioritized for your financial goals
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;