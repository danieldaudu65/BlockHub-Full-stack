export interface FileMessage {
  name: string;
  size: number;
  type: string;
  url?: string; // optional if not always sent
}
