
import React from 'react';
import { User, Brain, Settings, Briefcase, Lightbulb } from 'lucide-react';

interface TasteInsightSummaryProps {
  tastes: any;
}

const TasteInsightSummary: React.FC<TasteInsightSummaryProps> = ({ tastes }) => {
  const insights = [
    {
      icon: User,
      title: "Cross-Domain Profile",
      content: "Your diverse cultural interests suggest a multifaceted personality that values both intellectual depth and creative expression. You likely approach life with curiosity and openness to new experiences."
    },
    {
      icon: Brain,
      title: "Behavioral Traits",
      content: "You tend to be detail-oriented yet adaptable, preferring environments that offer both structure and creative freedom. Your work style likely balances analytical thinking with intuitive decision-making."
    },
    {
      icon: Settings,
      title: "UX or Product Preferences",
      content: "You'd enjoy tools with clean, intuitive interfaces that offer customization options. Content formats mixing visual elements with text would appeal to your varied interests and learning style."
    },
    {
      icon: Briefcase,
      title: "Career or Field Resonance",
      content: "Roles in creative technology, content strategy, or design thinking would suit you well. You'd thrive in fields that combine analytical skills with creative problem-solving."
    },
    {
      icon: Lightbulb,
      title: "Creative or Brand Strategy Insight",
      content: "Brands targeting people like you should emphasize authenticity, craftsmanship, and meaningful experiences over flashy marketing. Focus on substance and personal connection."
    }
  ];

  return (
    <div className="mt-16 pt-8 border-t border-white/20">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-display font-semibold text-white mb-3">
          Taste Insight Summary
        </h3>
        <p className="text-white/80 font-baloo">
          Deeper insights based on your cultural preferences
        </p>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <insight.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-display font-semibold text-white mb-2">
                  {insight.title}
                </h4>
                <p className="text-white/80 font-baloo text-sm leading-relaxed">
                  {insight.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasteInsightSummary;
