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
    } catch (error: any) {
      console.error('Error generating promotional suggestions:', error);
      // Return a 500 status code if there's an error generating promotions
      return new Response(JSON.stringify({ error: error.message || "Failed to generate promotional suggestions" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
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
