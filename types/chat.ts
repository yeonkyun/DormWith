// 채팅 관련 타입 정의

export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  isRead: boolean;
  type?: 'text' | 'image' | 'file' | 'voice'; // 확장성을 위함
}

export interface ChatRoom {
  id: string;
  name: string;
  avatar?: string;
  isGroup: boolean;
  members: {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatListItem {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  isGroup: boolean;
}
