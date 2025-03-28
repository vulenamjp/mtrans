import ollama from 'ollama'

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const DEFAULT_SYSTEM_MESSAGE_TEMPLATE = `
You are an AI assistant specializing in translation. Your tasks are:
1. Translate text from {sourceLang} to {targetLang}

When translating, please:
- Do not explain. Just translate.
- Do not provide word-for-word translations.
- Use formal language.
- Do not include the source language in the translation.
`;

export async function generateResponse(messages: Message[], sourceLang: string, targetLang: string): Promise<string> {
  try {
    // Replace placeholders in the system message template
    const systemMessageContent = DEFAULT_SYSTEM_MESSAGE_TEMPLATE
      .replace('{sourceLang}', sourceLang)
      .replace('{targetLang}', targetLang);

    const systemMessage: Message = {
      role: 'system',
      content: systemMessageContent,
    };
    console.log('messages', messages);
    // Add system message to the beginning of the messages array if not already present
    if (!messages.some(msg => msg.role === 'system')) {
      messages = [systemMessage, ...messages];
    }

    const response = await ollama.chat({
      model: 'gemma3:latest',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    return response.message.content || 'Cannot generate response';
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Error when generating response');
  }
}