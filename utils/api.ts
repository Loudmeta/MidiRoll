const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const MELODY_SYSTEM_PROMPT = `Generate a melody with 15 to 40 notes where each note is represented with one of the symbols
A, A#, B, C, C#, D, D#, E, F, F#, G, G#, an octave between 0 and 9, and a duration in milliseconds for which it should be played.

Output the result as a JSON array of triples where the first element of the triple is the note, the second is the octave, and the third is the duration in milliseconds.
In your response return only the JSON array without any additional strings before and after.

The melody should be about:`

interface OpenRouterResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

interface OpenRouterError extends Error {
  error?: {
    message: string
  }
  response?: {
    data: {
      error?: {
        message: string
      }
    }
  }
}

export async function callOpenRouterLLM(prompt: string): Promise<string> {
  const openRouterApiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || 
    "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"

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'PianoRoll Pro'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-90b-vision-instruct:free',
        messages: [
          { role: 'system', content: MELODY_SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ] as Message[],
        max_tokens: 500, // Increased for longer melodies
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`OpenRouter API request failed with status ${response.status}: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json() as OpenRouterResponse

    if (!data?.choices?.[0]?.message?.content) {
      const errorMessage = `Unexpected response format from OpenRouter API: ${JSON.stringify(data)}`
      console.error(errorMessage)
      throw new Error(errorMessage)
    }

    return data.choices[0].message.content.trim()

  } catch (error) {
    const err = error as OpenRouterError
    console.error('Error calling OpenRouter LLM:', err)
    
    if (err.response?.data) {
      console.error('OpenRouter API Error Details:', err.response.data)
      throw new Error(`OpenRouter API Error: ${err.response.data.error?.message || err.message}`)
    }
    
    throw new Error(`Error calling OpenRouter LLM: ${err.message}`)
  }
} 