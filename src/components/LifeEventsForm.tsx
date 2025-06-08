import React, { useState } from 'react';
import { LifeEvent } from '../types/financial';
import { Plus, X, Calendar, DollarSign } from 'lucide-react';

interface LifeEventsFormProps {
  upcomingEvents: LifeEvent[];
  majorEvents: LifeEvent[];
  onUpcomingChange: (events: LifeEvent[]) => void;
  onMajorChange: (events: LifeEvent[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const LifeEventsForm: React.FC<LifeEventsFormProps> = ({
  upcomingEvents,
  majorEvents,
  onUpcomingChange,
  onMajorChange,
  onNext,
  onPrevious
}) => {
  const [newUpcoming, setNewUpcoming] = useState<Partial<LifeEvent>>({
    event: '',
    timeframe: '',
    impact: '',
    financialImpact: 0
  });

  const [newMajor, setNewMajor] = useState<Partial<LifeEvent>>({
    event: '',
    timeframe: '',
    impact: '',
    financialImpact: 0,
    year: new Date().getFullYear()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addUpcomingEvent = () => {
    if (newUpcoming.event && newUpcoming.timeframe && newUpcoming.impact) {
      onUpcomingChange([...upcomingEvents, newUpcoming as LifeEvent]);
      setNewUpcoming({ event: '', timeframe: '', impact: '', financialImpact: 0 });
    }
  };

  const removeUpcomingEvent = (index: number) => {
    onUpcomingChange(upcomingEvents.filter((_, i) => i !== index));
  };

  const addMajorEvent = () => {
    if (newMajor.event && newMajor.impact) {
      onMajorChange([...majorEvents, newMajor as LifeEvent]);
      setNewMajor({ event: '', timeframe: '', impact: '', financialImpact: 0, year: new Date().getFullYear() });
    }
  };

  const removeMajorEvent = (index: number) => {
    onMajorChange(majorEvents.filter((_, i) => i !== index));
  };

  const commonUpcomingEvents = [
    'Child starting school',
    'Home purchase',
    'Career change',
    'Marriage',
    'Having a baby',
    'Home renovation',
    'Starting business',
    'Retirement'
  ];

  const commonMajorEvents = [
    'Birth of child',
    'Job loss',
    'Market loss',
    'Home purchase',
    'Inheritance',
    'Divorce',
    'Major illness',
    'Business sale'
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Life Events</h2>
        <p className="text-gray-600">Help us understand major life events that impact your financial planning</p>
      </div>

      {/* Upcoming Events */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="text-blue-600" size={20} />
          Upcoming Life Events
        </h3>

        <div className="space-y-4 mb-6">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{event.event}</h4>
                  <p className="text-sm text-gray-600">Timeframe: {event.timeframe}</p>
                  <p className="text-sm text-gray-600">Impact: {event.impact}</p>
                  {event.financialImpact !== 0 && (
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <DollarSign size={14} />
                      Financial Impact: ${Math.abs(event.financialImpact).toLocaleString()}
                      {event.financialImpact > 0 ? ' (positive)' : ' (expense)'}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeUpcomingEvent(index)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                value={newUpcoming.event}
                onChange={(e) => setNewUpcoming({ ...newUpcoming, event: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select or type custom event</option>
                {commonUpcomingEvents.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                value={newUpcoming.timeframe}
                onChange={(e) => setNewUpcoming({ ...newUpcoming, timeframe: e.target.value })}
                placeholder="When? (e.g., '2 years', 'next month')"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={newUpcoming.impact}
                onChange={(e) => setNewUpcoming({ ...newUpcoming, impact: e.target.value })}
                placeholder="Impact description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="number"
                value={newUpcoming.financialImpact || ''}
                onChange={(e) => setNewUpcoming({ ...newUpcoming, financialImpact: parseInt(e.target.value) || 0 })}
                placeholder="Financial impact ($)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addUpcomingEvent}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Upcoming Event
          </button>
        </div>
      </div>

      {/* Major Past Events */}
      <div className="bg-emerald-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="text-emerald-600" size={20} />
          Major Past Life Events
        </h3>

        <div className="space-y-4 mb-6">
          {majorEvents.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-emerald-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{event.event}</h4>
                  {event.year && <p className="text-sm text-gray-600">Year: {event.year}</p>}
                  <p className="text-sm text-gray-600">Impact: {event.impact}</p>
                  {event.financialImpact !== 0 && (
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <DollarSign size={14} />
                      Financial Impact: ${Math.abs(event.financialImpact).toLocaleString()}
                      {event.financialImpact > 0 ? ' (positive)' : ' (expense)'}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeMajorEvent(index)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                value={newMajor.event}
                onChange={(e) => setNewMajor({ ...newMajor, event: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select or type custom event</option>
                {commonMajorEvents.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                value={newMajor.year || ''}
                onChange={(e) => setNewMajor({ ...newMajor, year: parseInt(e.target.value) || undefined })}
                placeholder="Year"
                min="1950"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={newMajor.impact}
                onChange={(e) => setNewMajor({ ...newMajor, impact: e.target.value })}
                placeholder="Impact description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="number"
                value={newMajor.financialImpact || ''}
                onChange={(e) => setNewMajor({ ...newMajor, financialImpact: parseInt(e.target.value) || 0 })}
                placeholder="Financial impact ($)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addMajorEvent}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Major Event
          </button>
        </div>
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
          Get My Financial Plan
        </button>
      </div>
    </form>
  );
};