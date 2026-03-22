export interface Conversation {
  _id: string;
  participants: {
    _id: string;
    fullName: string;
    profileImage: string;
  }[];
  lastMessage: string; // now matches the API
  lastMessageTime: string; // added field
  unreadCount?: number; // optional since API may not send it
}


