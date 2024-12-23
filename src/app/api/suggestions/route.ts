// app/api/suggestions/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { prompt, language } = await req.json();

        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Complete the following ${language} code:\n${prompt}`,
            max_tokens: 100,
            temperature: 0.3,
            stop: ["\n\n"],
        });

        return NextResponse.json({ suggestion: response.choices[0]?.text });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get suggestion' }, { status: 500 });
    }
}