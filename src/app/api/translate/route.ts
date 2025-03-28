// filepath: /Users/namvule/01.Learning/01.AI/mtrans/src/pages/api/translate.ts
import { NextResponse } from 'next/server';
import { generateResponse, Message } from '@/utils/ai';


export async function POST(req: Request) {
  const { messages, sourceLang, targetLang } = await req.json();
  
  if (!messages || !sourceLang || !targetLang) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const response = await generateResponse(messages, sourceLang, targetLang);
    return NextResponse.json({ response: response }, { status: 200 });
  } catch (error) {
    console.error('Error in API handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}