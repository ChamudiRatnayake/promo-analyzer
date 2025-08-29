"use client"

import { Badge } from "../ui/badge"
import { useEffect, useState } from 'react';
import { useRef } from 'react';

interface PromotionalInsightsProps {
  revenueChange: number
  ordersChange: number
  customersChange: number
}

export function PromotionalInsights({ revenueChange, ordersChange, customersChange }: PromotionalInsightsProps) {
  const [currentPromotions, setCurrentPromotions] = useState<any[]>([]);
  const [lastValidPromotions, setLastValidPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    const fetchPromotions = async () => {
      setLoading(true);
      setError(null);
      console.log('Fetching promotional suggestions from API...');
      try {
        const response = await fetch('/api/sales-insights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ revenueChange, ordersChange, customersChange }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Promotional suggestions fetched successfully:', data);
        console.log('Frontend received data.promotions:', data.promotions);

        if (data.promotions && data.promotions.length > 0) {
          setCurrentPromotions(data.promotions);
          setLastValidPromotions(data.promotions); // Store the last valid promotions
        } else {
          // If no promotions are returned, display last valid promotions if any, or default promotions.
          setCurrentPromotions(lastValidPromotions.length > 0 ? lastValidPromotions : [
            { title: "Seasonal Sale", description: "Offer discounts on seasonal items", expectedImpact: "+10%" },
            { title: "Buy One Get One Free", description: "Encourage bulk purchases", expectedImpact: "+15%" },
            { title: "Loyalty Program Bonus", description: "Reward returning customers", expectedImpact: "+12%" },
          ]);
        }
      } catch (e: any) {
        console.error('Error fetching promotional suggestions:', e);
        setError(e.message);
        setCurrentPromotions(lastValidPromotions.length > 0 ? lastValidPromotions : [
          { title: "Seasonal Sale", description: "Offer discounts on seasonal items", expectedImpact: "+10%" },
          { title: "Buy One Get One Free", description: "Encourage bulk purchases", expectedImpact: "+15%" },
          { title: "Loyalty Program Bonus", description: "Reward returning customers", expectedImpact: "+12%" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []); // Add lastValidPromotions to dependency array to re-run effect when it changes

  if (loading) {
    return <div className="space-y-3"><h4 className="font-semibold text-gray-900">Loading Promotions...</h4></div>;
  }

  if (error) {
    return <div className="space-y-3"><h4 className="font-semibold text-red-600">Error: {error}</h4></div>;
  }

  // Display message if no currentPromotions are available after loading
  if (currentPromotions.length === 0) {
    return <div className="space-y-3"><h4 className="font-semibold text-gray-900">No promotional suggestions at this time.</h4></div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold text-gray-900">Recommended Promotions</h4>
        <Badge variant="secondary">AI Generated</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {currentPromotions.map((promotion, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow h-20 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-sm text-gray-900 truncate">💡 {promotion.title}</h5>
                <p className="text-xs text-gray-600 mt-1 truncate">{promotion.description}</p>
              </div>
              <div className="ml-2 flex-shrink-0">
                <span className="text-xs font-medium text-green-600">📈 {promotion.expectedImpact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
