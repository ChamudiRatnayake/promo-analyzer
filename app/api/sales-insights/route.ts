import { generatePromotionalSuggestions } from '../../../lib/openai';

export async function POST(request: Request) {
  const { revenueChange, ordersChange, customersChange } = await request.json();

  let status: "success" | "alert";
  let message: string;
  let promotions: any[] = [];

  if (revenueChange >= 0 && ordersChange >= 0 && customersChange >= 0) {
    status = "success";
    message = "Great job! Sales are steady or improving 🎉";
  } else {
    status = "alert";
    // Using revenueChange for the main alert message as it's the most significant
    message = `Alert: Revenue dropped by ${Math.abs(revenueChange).toFixed(1)}% compared to last week`;

    console.log('Generating promotional suggestions...');
    try {
      // Pass all relevant changes to the AI for more accurate suggestions
      promotions = await generatePromotionalSuggestions(revenueChange, ordersChange, customersChange);
    } catch (error) {
      console.error('Error generating promotional suggestions:', error);
      // Fallback or default promotions in case of API error
      promotions = [
        { "title": "Seasonal Sale", "description": "Offer discounts on seasonal items", "expectedImpact": "+10%" },
        { "title": "Buy One Get One Free", "description": "Encourage bulk purchases", "expectedImpact": "+15%" },
        { "title": "Loyalty Program Bonus", "description": "Reward returning customers", "expectedImpact": "+12%" },
      ];
    }
  }

  console.log('Sales insights data fetched and processed.', { status, message, revenueChange, ordersChange, customersChange, promotions: promotions.length });

  const responseBody: any = {
    status,
    message,
    promotions,
    revenueChange,
    ordersChange,
    customersChange,
  };

  return new Response(JSON.stringify(responseBody), {
    headers: { "Content-Type": "application/json" },
  });
}
