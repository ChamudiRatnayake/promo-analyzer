import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePromotionalSuggestions(
  lastWeekTotal: number,
  thisWeekTotal: number,
  dropPercent: number
) {
  const prompt = `You are a marketing expert specializing in retail promotions. 
  Your task is to generate three distinct and actionable promotional suggestions
   for a business that has experienced a sales drop.\n\nHere is the sales data:\n- 
   Last week's total sales: ${lastWeekTotal} USD\n- This week's total sales: ${thisWeekTotal} USD\n-
    Percentage drop: ${dropPercent}%\n\nBased on this sales drop, provide three promotional suggestions.
     Each suggestion should include:\n1.  **Title**: A concise title for the promotion.\n2.  **Description**:
      A brief explanation of the promotion and how it works.\n3.  **Expected Impact**: An estimated percentage
       increase in sales this promotion could achieve (e.g., \"+10%\", \"+15%\").\n\nFormat your response as a 
       JSON array of objects, like this:\n\n[\n  {{\n    \"title\": \"Promotion Title 1\",\n    \"description\": 
       \"Description of promotion 1\",\n    \"expectedImpact\": \"+X%\"\n  }},\n  {{\n    \"title\": \"Promotion Title 2\",\n  
         \"description\": \"Description of promotion 2\",\n    \"expectedImpact\": \"+Y%\"\n  }},\n  {{\n    \"title\": \"Promotion Title 3\",\n   
          \"description\": \"Description of promotion 3\",\n    \"expectedImpact\": \"+Z%\"\n  }}\n]\n`;

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
