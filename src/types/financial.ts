export interface PersonalBackground {
  maritalStatus: string;
  children: number;
  age: number;
  education: string;
  careerStage: string;
  industry: string;
  income: number;
}

export interface LifeEvent {
  event: string;
  timeframe: string;
  impact: string;
  financialImpact: number;
  year?: number;
}

export interface FinancialJourney {
  moneyMindset: string;
  pastExperiences: string[];
  currentChallenges: string[];
  financialValues: string[];
  riskTolerance: string;
}

export interface FinancialStory {
  personalBackground: PersonalBackground;
  financialJourney: FinancialJourney;
  lifeEventsUpcoming: LifeEvent[];
  lifeEventsMajor: LifeEvent[];
  preferences: Record<string, string>;
}

export interface PortfolioAllocation {
  stocks: number;
  bonds: number;
  reits: number;
  commodities: number;
  esgFunds?: number;
}

export interface FinancialAction {
  type: string;
  priority: string;
  priorityScore: number;
  description: string;
  reasoning: string;
  personalizedContext: string;
  impact: string;
  confidence: number;
  storyConnection: string;
  estimatedSavings?: number;
  estimatedAmount?: number;
  coverageAmount?: number;
}

export interface ProcessedResults {
  portfolio: {
    allocation: PortfolioAllocation;
    reasoning: Record<string, string>;
    personalizedInsights: string[];
    confidence: number;
  };
  actions: FinancialAction[];
  personalizationScore: number;
  storyCompleteness: Record<string, string>;
}