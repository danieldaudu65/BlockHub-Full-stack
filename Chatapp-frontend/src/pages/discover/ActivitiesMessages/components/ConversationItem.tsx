import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Conversation } from '../../../../types/chat';
import { API_URL } from '../../../../confiq';

interface ConversationItemProps {
  conversation: Conversation;
  currentUserId: string; // pass this from parent
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, currentUserId }) => {
  const navigate = useNavigate();

  // Find the other participant
  const otherParticipant = conversation.participants.find(
    (p) => p._id !== currentUserId
  );

  // console.log('currentUserId', currentUserId, 'participants', conversation.participants);

  const handleConversationClick = async () => {
    try {
      // Mark messages as read
      await fetch(`${API_URL}/user_activity/messages/markAsRead/${conversation._id}`, {
        method: 'PUT', // or POST depending on your backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId }),
      });

      // Navigate to the chatroom
      navigate(`/chatroom/${conversation._id}`);
    } catch (error) {
      console.error('Failed to mark messages as read', error);
      // Still navigate even if the request fails
      navigate(`/chatroom/${conversation._id}`);
    }
  };

  return (
    <div
      className="flex items-center bg-[#181A1D] rounded-xl p-4 shadow-lg cursor-pointer"
      onClick={handleConversationClick}
    >
      <img
        src={otherParticipant?.profileImage || '/default-avatar.png'}
        alt="Avatar"
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div className="flex-1">
        <h3 className="text-white font-semibold">{otherParticipant?.fullName}</h3>
        <p className="text-gray-400 max-w-[200px]  text-sm truncate">
          {conversation.lastMessage || ''}
        </p>
      </div>
      <div className="text-right">
        <span className="text-gray-500 text-xs block mb-1">
          {conversation.lastMessageTime &&
            new Date(conversation.lastMessageTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
        </span>
        {(conversation?.unreadCount || 0) > 0 && (
          <span className="inline-block bg-[#a28ae893] text-purple-200 text-xs font-bold rounded-full min-w-[28px] h-4 px-1  leading-4 text-center">
            {conversation.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
