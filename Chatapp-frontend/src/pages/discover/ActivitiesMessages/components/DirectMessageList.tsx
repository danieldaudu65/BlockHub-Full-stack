import React, { useEffect, useState } from 'react';
import ConversationItem from './ConversationItem';
import { API_URL } from '../../../../confiq';
import type { Conversation } from '../../../../types/chat';
// import ClipLoader from 'react-spinners/ClipLoader';
import CLiploader from '../../../../components/CLiploader';

const DirectMessageList: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setError('User ID not found. Please log in.');
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/user_activity/my_conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('user_id'),
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);

        setConversations(data);
        console.log(data);
        
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching conversations:', err);
        setError('Failed to load conversations. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <CLiploader />
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation._id}
          conversation={conversation}
          currentUserId={localStorage.getItem('user_id') || ''}
        />))}
    </div>
  );
};

export default DirectMessageList;
