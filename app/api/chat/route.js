import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { messages, systemPrompt } = await req.json();

    // Get Friendli API key from environment variable
    const FRIENDLI_API_KEY = process.env.FRIENDLI_API_KEY;
    
    if (!FRIENDLI_API_KEY) {
      return NextResponse.json(
        { error: 'Friendli API key not configured' },
        { status: 500 }
      );
    }

    // Prepare messages for Friendli AI
    const friendliMessages = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Call Friendli AI Serverless Endpoint
    // Using the OpenAI-compatible API format
    const response = await fetch('https://api.friendli.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FRIENDLI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta-llama-3.1-70b-instruct', // Fast, high-quality model
        messages: friendliMessages,
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Friendli API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from Friendli AI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      content: data.choices[0].message.content,
      model: data.model,
      usage: data.usage
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
