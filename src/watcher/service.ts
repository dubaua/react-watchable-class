import { IMessage } from './message.interface';
import { v4 as uuidv4 } from 'uuid';

export class Service {
  public messagesById = new Map<string, IMessage>();

  public addMessage(text: string): void {
    const id = uuidv4();
    this.messagesById.set(id, { id, text });
  }

  public clearMessages(): void {
    this.messagesById.clear();
  }
}
