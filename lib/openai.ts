import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// It's highly recommended to store your API key securely as an environment variable.
const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
const US_HOLIDAYS_CALENDAR_ID = 'en.usa%23holiday%40group.v.calendar.google.com'; // URL-encoded

async function fetchGoogleCalendarEvents(): Promise<string[]> {
  if (!GOOGLE_CALENDAR_API_KEY) {
    console.warn('GOOGLE_CALENDAR_API_KEY is not set. Skipping Google Calendar events fetch.');
    return [];
  }

  const today = new Date();
  const timeMin = today.toISOString(); // Get events from today onwards

  const twoMonthsLater = new Date();
  twoMonthsLater.setMonth(today.getMonth() + 2);
  const timeMax = twoMonthsLater.toISOString(); // Get events up to two months from now

  const url = `https://www.googleapis.com/calendar/v3/calendars/${US_HOLIDAYS_CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch Google Calendar events: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    
    // Extract event summaries (titles)
    const eventNames = data.items ? data.items.map((item: any) => item.summary) : [];
    return eventNames;
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    return [];
  }
}

export async function generatePromotionalSuggestions(
  revenueChange: number,
  ordersChange: number,
  customersChange: number
) {
  // Fetch upcoming events from Google Calendar
  const googleCalendarEvents = await fetchGoogleCalendarEvents();
  
  let salesPerformance = "";
  if (revenueChange < 0) {
    salesPerformance += `Revenue has dropped by ${Math.abs(revenueChange).toFixed(1)}%. `;
  }
  if (ordersChange < 0) {
    salesPerformance += `Orders have dropped by ${Math.abs(ordersChange).toFixed(1)}%. `;
  }
  if (customersChange < 0) {
    salesPerformance += `Customer count has dropped by ${Math.abs(customersChange).toFixed(1)}%. `;
  }
  if (revenueChange >= 0 && ordersChange >= 0 && customersChange >= 0) {
    salesPerformance = "Sales performance is stable or improving across all metrics.";
  }

  // Combine hardcoded and Google Calendar events
  const allUpcomingEvents = [...googleCalendarEvents];

  const prompt = `You are a marketing expert specializing in retail promotions. 
  Your task is to generate three distinct and actionable promotional suggestions
  for a business based on its recent sales performance. 
  
  Here is the sales performance data:
  - ${salesPerformance}
  
  Upcoming USA calendar events that could be relevant for promotions:
  - ${allUpcomingEvents.length > 0 ? allUpcomingEvents.join(", ") : "No major upcoming events."}

  Based on this sales performance and upcoming events, provide three promotional suggestions. 
  Each suggestion should include:
  1.  **Title**: A concise title for the promotion.
  2.  **Description**: A brief explanation of the promotion and how it works.
  3.  **Expected Impact**: An estimated percentage increase in sales this promotion could achieve (e.g., "+10%", "+15%").
  
  Format your response as a JSON array of objects, like this:
  
  [
    {{
      "title": "Promotion Title 1",
      "description": "Description of promotion 1",
      "expectedImpact": "+X%"
    }},
    {{
      "title": "Promotion Title 2",
      "description": "Description of promotion 2",
      "expectedImpact": "+Y%"
    }},
    {{
      "title": "Promotion Title 3",
      "description": "Description of promotion 3",
      "expectedImpact": "+Z%"
    }}
  ]
  `;
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    let parsedContent = JSON.parse(response.choices[0].message.content || '[]');

    // If the content is an object with a 'promotions' key, use that array
    if (typeof parsedContent === 'object' && parsedContent !== null && 'promotions' in parsedContent) {
      parsedContent = parsedContent.promotions;
    }

    // Ensure parsedContent is an array
    const suggestions = Array.isArray(parsedContent) ? parsedContent : [];
    return suggestions;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return [];
  }
}
