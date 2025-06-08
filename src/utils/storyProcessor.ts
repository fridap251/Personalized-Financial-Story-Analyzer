import { FinancialStory, ProcessedResults, PortfolioAllocation, FinancialAction } from '../types/financial';

export class FinancialStoryProcessor {
  processStory(story: FinancialStory): ProcessedResults {
    const portfolio = this.generatePortfolioAllocation(story);
    const actions = this.generateFinancialActions(story);
    const personalizationScore = this.calculatePersonalizationScore(story);
    const storyCompleteness = this.assessStoryCompleteness(story);

    return {
      portfolio,
      actions,
      personalizationScore,
      storyCompleteness
    };
  }

  private generatePortfolioAllocation(story: FinancialStory) {
    const baseAllocations = {
      conservative: { stocks: 40, bonds: 50, reits: 5, commodities: 5 },
      moderate: { stocks: 60, bonds: 30, reits: 5, commodities: 5 },
      aggressive: { stocks: 80, bonds: 10, reits: 5, commodities: 5 }
    };

    let allocation = { ...baseAllocations[story.financialJourney.riskTolerance as keyof typeof baseAllocations] };

    // Apply risk trauma adjustments
    const negativeExperiences = story.financialJourney.pastExperiences.filter(exp => 
      exp.toLowerCase().includes('loss') || exp.toLowerCase().includes('crash') || exp.toLowerCase().includes('debt')
    );

    if (negativeExperiences.length > 0) {
      const adjustment = Math.min(15, negativeExperiences.length * 5);
      allocation.stocks -= adjustment;
      allocation.bonds += adjustment;
    }

    // Family stability adjustments
    if (story.personalBackground.children > 0) {
      const stabilityShift = Math.min(10, story.personalBackground.children * 3);
      allocation.stocks -= stabilityShift;
      allocation.bonds += stabilityShift;
    }

    // ESG considerations
    if (story.financialJourney.financialValues.includes('ethical investing')) {
      const esgAmount = Math.min(15, Math.floor(allocation.stocks * 0.2));
      allocation.stocks -= esgAmount;
      (allocation as any).esgFunds = esgAmount;
    }

    // Age-based adjustments
    if (story.personalBackground.age > 50) {
      const ageShift = Math.min(10, (story.personalBackground.age - 50) / 2);
      allocation.stocks -= ageShift;
      allocation.bonds += ageShift;
    }

    const reasoning = this.generateAllocationReasoning(story, allocation);
    const insights = this.generatePersonalInsights(story);
    const confidence = this.calculateConfidence(story);

    return {
      allocation,
      reasoning,
      personalizedInsights: insights,
      confidence
    };
  }

  private generateAllocationReasoning(story: FinancialStory, allocation: PortfolioAllocation): Record<string, string> {
    const reasoning: Record<string, string> = {};

    reasoning.stocks = `${allocation.stocks}% stocks balance growth potential with your ${story.financialJourney.riskTolerance} risk tolerance and ${story.personalBackground.children > 0 ? 'family responsibilities' : 'personal goals'}.`;

    reasoning.bonds = `${allocation.bonds}% bonds provide stability for ${story.lifeEventsUpcoming.length > 0 ? 'upcoming life events' : 'financial security'} and reflect your emphasis on ${story.financialJourney.financialValues.join(' and ')}.`;

    if ((allocation as any).esgFunds) {
      reasoning.esgFunds = `${(allocation as any).esgFunds}% ESG allocation aligns with your ethical investing values while maintaining diversification.`;
    }

    return reasoning;
  }

  private generatePersonalInsights(story: FinancialStory): string[] {
    const insights: string[] = [];

    // Experience-based insights
    const pastLosses = story.financialJourney.pastExperiences.filter(exp => 
      exp.toLowerCase().includes('loss') || exp.toLowerCase().includes('crash')
    );
    if (pastLosses.length > 0) {
      insights.push("Your past market experiences influenced a more conservative allocation to protect against volatility while still capturing growth.");
    }

    // Career stage insights
    if (story.personalBackground.careerStage === 'mid-career' && story.personalBackground.children > 0) {
      insights.push(`As a ${story.personalBackground.careerStage} ${story.personalBackground.industry} professional with family, we've balanced growth potential with stability needs.`);
    }

    // Values-based insights
    if (story.financialJourney.financialValues.includes('family first')) {
      insights.push("Your 'family first' priority shaped the conservative bond allocation for upcoming family expenses and security.");
    }

    if (story.financialJourney.financialValues.includes('long-term thinking')) {
      insights.push("Your long-term perspective allows for strategic equity exposure despite short-term market fluctuations.");
    }

    return insights;
  }

  private generateFinancialActions(story: FinancialStory): FinancialAction[] {
    const actions: FinancialAction[] = [];

    // Education planning
    if (story.personalBackground.children > 0) {
      const schoolEvents = story.lifeEventsUpcoming.filter(event => 
        event.event.toLowerCase().includes('school') || event.event.toLowerCase().includes('education')
      );

      if (schoolEvents.length > 0) {
        actions.push({
          type: 'education_planning',
          priority: 'high',
          priorityScore: 9,
          description: 'Start 529 education savings plan',
          reasoning: `Child starting school in ${schoolEvents[0].timeframe} requires dedicated education funding.`,
          personalizedContext: `Based on your ${story.personalBackground.education} background, early education savings will prevent future debt burden.`,
          impact: 'Tax-advantaged growth for education expenses',
          confidence: 0.94,
          storyConnection: 'Educational background + upcoming school costs',
          estimatedSavings: 25000
        });
      }
    }

    // Emergency fund optimization
    const hasJobTransition = story.lifeEventsUpcoming.some(event => 
      event.event.toLowerCase().includes('job') || event.event.toLowerCase().includes('career')
    );

    if (hasJobTransition || story.personalBackground.children > 0) {
      const monthsNeeded = 6 + (hasJobTransition ? 2 : 0) + story.personalBackground.children;
      actions.push({
        type: 'emergency_fund_boost',
        priority: 'high',
        priorityScore: 8,
        description: `Increase emergency fund to ${monthsNeeded} months expenses`,
        reasoning: `${hasJobTransition ? 'Job transition + ' : ''}Family responsibilities require enhanced safety net`,
        personalizedContext: 'Your risk-aware approach and family obligations suggest maintaining higher emergency reserves.',
        impact: 'Enhanced financial security during life transitions',
        confidence: 0.89,
        storyConnection: `${hasJobTransition ? 'Job transition + ' : ''}Family security focus`,
        estimatedAmount: story.personalBackground.income * monthsNeeded / 12
      });
    }

    // Tax optimization
    if (story.personalBackground.income > 50000) {
      actions.push({
        type: 'retirement_optimization',
        priority: 'medium',
        priorityScore: 7,
        description: 'Maximize 401(k) contribution',
        reasoning: `Income of $${story.personalBackground.income.toLocaleString()} creates significant tax optimization opportunities.`,
        personalizedContext: 'Your long-term focus and career stability make retirement contribution increases highly beneficial.',
        impact: `Potential $${Math.round(story.personalBackground.income * 0.22 * 0.2).toLocaleString()} annual tax savings`,
        confidence: 0.87,
        storyConnection: 'Income level + long-term planning values',
        estimatedSavings: story.personalBackground.income * 0.22 * 0.2
      });
    }

    // Insurance planning
    if (story.personalBackground.children > 0 && story.personalBackground.maritalStatus === 'married') {
      const coverageAmount = story.personalBackground.income * 10;
      actions.push({
        type: 'insurance_planning',
        priority: 'medium',
        priorityScore: 6,
        description: 'Review life insurance coverage',
        reasoning: `Family with ${story.personalBackground.children} child(ren) requires income protection planning.`,
        personalizedContext: 'Your family-first values and financial security focus indicate the importance of comprehensive protection.',
        impact: `$${coverageAmount.toLocaleString()} coverage recommendation`,
        confidence: 0.85,
        storyConnection: 'Family responsibilities + security values',
        coverageAmount
      });
    }

    return actions.sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 5);
  }

  private calculatePersonalizationScore(story: FinancialStory): number {
    let score = 0;

    // Personal background completeness
    if (story.personalBackground.income > 0) score += 0.2;
    if (story.personalBackground.age > 0) score += 0.1;

    // Financial journey depth
    score += Math.min(0.3, story.financialJourney.pastExperiences.length * 0.1);
    score += Math.min(0.2, story.financialJourney.financialValues.length * 0.05);

    // Life events richness
    score += Math.min(0.2, story.lifeEventsUpcoming.length * 0.1);

    return Math.min(1.0, score);
  }

  private calculateConfidence(story: FinancialStory): number {
    let confidence = 0.6;

    if (story.financialJourney.pastExperiences.length >= 2) confidence += 0.15;
    if (story.lifeEventsUpcoming.length > 0) confidence += 0.1;
    if (story.financialJourney.financialValues.length >= 2) confidence += 0.1;
    if (story.personalBackground.income > 0) confidence += 0.05;

    return Math.min(0.98, confidence);
  }

  private assessStoryCompleteness(story: FinancialStory): Record<string, string> {
    const completeness: Record<string, string> = {};

    if (story.financialJourney.pastExperiences.length < 2) {
      completeness.pastExperiences = 'Adding more financial experiences will improve recommendation accuracy';
    }

    if (story.lifeEventsUpcoming.length === 0) {
      completeness.lifeEvents = 'Including upcoming life events helps time recommendations better';
    }

    if (story.financialJourney.financialValues.length < 3) {
      completeness.values = 'More financial values help align investment choices with your priorities';
    }

    return completeness;
  }
}