const OPENAI_API_KEY = (import.meta as any).env?.VITE_OPENAI_API_KEY;

export async function generateDailyQuestions(profileSummary: string): Promise<string[]> {
  if (!OPENAI_API_KEY) {
    console.warn('OpenAI API key not found, using fallback questions');
    return [
      "How are you feeling today?",
      "Have you noticed any changes in your symptoms?",
      "Are you following your treatment plan?",
      "Do you have any concerns about your recovery?",
      "How is your pain level today?"
    ];
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a medical assistant helping create personalized daily check-in questions for patients. Generate exactly 5 relevant questions based on the patient profile provided.'
          },
          {
            role: 'user',
            content: `Generate 5 daily check-in questions based on this patient profile summary: ${profileSummary}. Make them specific to their condition and recovery progress.`
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    // Parse the response to extract questions
    const questions = content
      .split('\n')
      .filter(line => line.trim().length > 0)
      .filter(line => /^\d+\.|\-|\•/.test(line.trim()))
      .map(line => line.replace(/^\d+\.\s*|\-\s*|\•\s*/, '').trim())
      .slice(0, 5);

    return questions.length >= 5 ? questions : [
      "How are you feeling today?",
      "Have you noticed any changes in your symptoms?",
      "Are you following your treatment plan?",
      "Do you have any concerns about your recovery?",
      "How is your pain level today?"
    ];
  } catch (error) {
    console.error('Error generating questions with OpenAI:', error);
    return [
      "How are you feeling today?",
      "Have you noticed any changes in your symptoms?",
      "Are you following your treatment plan?",
      "Do you have any concerns about your recovery?",
      "How is your pain level today?"
    ];
  }
}

export async function generateRealityCheckExplanation(
  patientAnswers: any,
  expectedValues: any,
  alignmentScore: number
): Promise<string> {
  if (!OPENAI_API_KEY) {
    return alignmentScore >= 80
      ? "Your recovery is progressing well within expected parameters."
      : "Some symptoms are outside expected ranges. Please consult your healthcare provider.";
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a medical AI assistant explaining patient recovery alignment. Provide a brief, encouraging explanation of their current status.'
          },
          {
            role: 'user',
            content: `Patient reported: ${JSON.stringify(patientAnswers)}. Expected values: ${JSON.stringify(expectedValues)}. Alignment score: ${alignmentScore}%. Provide a brief explanation of their recovery status.`
          }
        ],
        max_tokens: 150,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Unable to generate explanation.";
  } catch (error) {
    console.error('Error generating explanation with OpenAI:', error);
    return alignmentScore >= 80
      ? "Your recovery is progressing well within expected parameters."
      : "Some symptoms are outside expected ranges. Please consult your healthcare provider.";
  }
}
