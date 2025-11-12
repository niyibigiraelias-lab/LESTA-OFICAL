
export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  id: number;
  text: string;
  author: MessageAuthor;
}