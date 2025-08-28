import { generatePromotionalSuggestions } from '../../../lib/openai';

export async function GET() {
  const generateSalesData = () => {
    const salesData = [];
    // Ensure a sales drop for testing
    for (let i = 0; i < 7; i++) { // Last week's sales (higher)
      salesData.push(Math.floor(Math.random() * (500 - 300 + 1)) + 300);
    }
    for (let i = 0; i < 7; i++) { // This week's sales (lower)
      salesData.push(Math.floor(Math.random() * (250 - 100 + 1)) + 100);
    }
    return salesData;
  };

  const salesData = generateSalesData();

  const lastWeekSales = salesData.slice(0, 7);
  const thisWeekSales = salesData.slice(7, 14);

  const lastWeekTotal = lastWeekSales.reduce((sum, sales) => sum + sales, 0);
  const thisWeekTotal = thisWeekSales.reduce((sum, sales) => sum + sales, 0);

  let status: "success" | "alert";
  let message: string;
  let dropPercent: number | undefined;
  let promotions: any[] = [];

  if (thisWeekTotal >= lastWeekTotal) {
    status = "success";
    message = "Great job! Sales are steady or improving 🎉";
  } else {
    status = "alert";
    const drop = lastWeekTotal - thisWeekTotal;
    dropPercent = parseFloat(((drop / lastWeekTotal) * 100).toFixed(1));
    message = `Alert: Sales dropped by ${dropPercent}% compared to last week`;

    if (dropPercent !== undefined) {
      try {
        promotions = await generatePromotionalSuggestions(lastWeekTotal, thisWeekTotal, dropPercent);
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
  }

  const responseBody: any = {
    lastWeekTotal,
    thisWeekTotal,
    status,
    message,
    promotions,
  };

  if (dropPercent !== undefined) {
    responseBody.dropPercent = dropPercent;
  }

  return new Response(JSON.stringify(responseBody), {
    headers: { "Content-Type": "application/json" },
  });
}
