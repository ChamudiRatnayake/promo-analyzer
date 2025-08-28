export async function GET() {
  const generateSalesData = () => {
    const salesData = [];
    for (let i = 0; i < 14; i++) {
      salesData.push(Math.floor(Math.random() * (500 - 150 + 1)) + 150);
    }
    return salesData;
  };

  const salesData = generateSalesData();

  const lastWeekSales = salesData.slice(0, 7);
  const thisWeekSales = salesData.slice(7, 14);

  const lastWeekTotal = lastWeekSales.reduce((sum, sales) => sum + sales, 0);
  const thisWeekTotal = thisWeekSales.reduce((sum, sales) => sum + sales, 0);

  const promotionalSuggestions = [
    { "title": "10% Lunch Discount", "description": "Boost midday sales", "expectedImpact": "+8%" },
    { "title": "Happy Hour Special", "description": "2-5 PM promotion", "expectedImpact": "+15%" },
    { "title": "Combo Deal Offer", "description": "Bundle discount", "expectedImpact": "+10%" },
    { "title": "Weekend Brunch Promo", "description": "Attract brunch crowd", "expectedImpact": "+12%" },
    { "title": "Family Meal Deal", "description": "Cater to families", "expectedImpact": "+18%" },
    { "title": "Student Discount", "description": "Target local students", "expectedImpact": "+7%" },
  ];

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
    
    // Select 3 random promotional suggestions
    const shuffled = [...promotionalSuggestions].sort(() => 0.5 - Math.random());
    promotions = shuffled.slice(0, 3);
  }

  return new Response(JSON.stringify({
    lastWeekTotal,
    thisWeekTotal,
    dropPercent,
    status,
    message,
    promotions,
  }), {
    headers: { "Content-Type": "application/json" },
  });
}
