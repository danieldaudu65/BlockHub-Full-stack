import type { FileMessage } from "./FileMessage";
import type { Sender } from "./Sender";



export interface Message {
  _id: string;
  chatId: string;
  sender: Sender;
  content: string;
  createdAt: string;
  file?: FileMessage;
}