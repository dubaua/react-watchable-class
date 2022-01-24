import { IMessage } from './message.interface';
import { v4 as uuidv4 } from 'uuid';
import { wrap } from './wrap';
@wrap
export class Service {
  public hasMessages = false;

  public readonly messagesById = new Map<string, IMessage>();

  public get messages(): IMessage[] {
    return Array.from(this.messagesById.values());
  }

  public addMessage(text: string): void {
    const id = uuidv4();
    this.messagesById.set(id, { id, text });
  }

  public clearMessages(): void {
    this.messagesById.clear();
  }
}
