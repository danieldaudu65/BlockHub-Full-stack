import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
// import { RiAttachmentLine, RiSendPlane2Fill } from 'react-icons/ri';
import { Img as Image } from 'react-image';
import { API_URL } from '../../../../confiq';
import { io, Socket } from 'socket.io-client';
import type { Participant } from '../../../../types/Perticipants';
import type { Message } from '../../../../types/Message';
import CLiploader from '../../../../components/CLiploader';
import { file, send } from '../../../../assets';


interface Chat {
  _id: string;
  participants: Participant[];
  createdAt: string;
  updatedAt: string;
  job: string;
  lastMessage: string | null;
  lastMessageTime?: string;
  __v?: number;
}

interface ConversationResponse {
  chat: Chat;
  lastMessage: Message | null;
}

const socket: Socket = io(API_URL);

const ChatRoom: React.FC = () => {
  const { id: chatId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [partner, setPartner] = useState<Participant | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  const currentUserId = localStorage.getItem('user_id') ?? '';

  useEffect(() => {
    const use_image = localStorage.getItem('user_image')
    setUserImage(use_image)
  }, [])

  useEffect(() => {
    if (!chatId) return;
    console.log(chatId);
    

    const token = localStorage.getItem('token');

    // Fetch chat details
    fetch(`${API_URL}/user_activity/conversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, token }),
    })
      .then(res => res.json())
      .then((data: ConversationResponse) => {

        console.log(data);

        const otherUser = data.chat.participants.find((p) => p._id !== currentUserId);
        setPartner(otherUser || null);
      })
      .catch(err => console.error('Failed to load conversation:', err));

    // Fetch chat messages
    fetch(`${API_URL}/user_activity/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, token }),
    })
      .then(res => res.json())
      .then((messages: Message[]) => {

        console.log("-------", messages);

        setMessages(messages);
      })
      .catch(err => console.error('Failed to load messages:', err));

    // Create socket connection here
    const socket: Socket = io(API_URL);

    // Join chat room
    socket.emit('joinChat', chatId);

    // Listen for incoming messages
    socket.on('receiveMessage', (message: Message) => {
      const senderId = typeof message.sender === 'string' ? message.sender : message.sender?._id;
      if (senderId && senderId !== currentUserId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    // Clean up on unmount or chatId change
    return () => {
      socket.emit('leaveChat', chatId);
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, [chatId, currentUserId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // Auto scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData: Message = {
      _id: chatId ?? '/',
      chatId: chatId ?? '',
      sender: currentUser,  // <-- wrap currentUserId in an object
      content: newMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, messageData]);
    socket.emit('sendMessage', messageData);
    setNewMessage('');
  };

  const currentUser = {
    _id: currentUserId,
    fullName: localStorage.getItem('user_fullName') || 'Unknown',
    profileImage: localStorage.getItem('user_profileImage') || 'default-image-url',
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1️⃣ Upload file to backend
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_URL}/user_upload/upload`, {
      method: 'POST',
      body: formData
    });
    const uploadedFile = await res.json();
    console.log('uploadedFile:', uploadedFile);

    const newFileMsg: Message = {
      _id: uploadedFile._id,
      chatId: uploadedFile.chatId,
      sender: currentUser,
      content: '',
      file: {
        name: uploadedFile.file.name,
        size: uploadedFile.file.size,  // <-- make sure this exists and is a number
        type: uploadedFile.file.type,
        url: uploadedFile.file.url
      },
      createdAt: uploadedFile.createdAt,
    };

    setMessages((prev) => [...prev, newFileMsg]);
    socket.emit('sendMessage', newFileMsg);
  };


  if (!partner) {
    return <CLiploader />
  }

  const isMyMessage = (message: Message) => {
    if (!message.sender) return false; // sender missing = treat as not mine

    if (typeof message.sender === 'string') {
      return message.sender === currentUserId;
    }

    // sender is an object - check _id safely
    return message.sender._id === currentUserId;
  };
  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#181819] border-b border-neutral-800">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft size={24} />
          <Image src={partner.profileImage} className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{partner.fullName}</h2>
            <p className="text-sm text-gray-400">
              @{partner.fullName.replace(/\s+/g, '').toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            className={`flex ${isMyMessage(message) ? 'justify-start' : 'justify-start'
              }`}
          >
            <div
              className={`flex px-2 items-start gap-2 ${isMyMessage(message) ? 'flex-row' : 'flex-row'
                }`}
            >
              {!isMyMessage(message) && (
                <Image src={partner.profileImage} className="w-10 h-10 rounded-full" />
              )}

              {isMyMessage(message) && (
                <Image src={userImage || '/default-avatar.png'} className="w-10 h-10 rounded-full" />
              )}
              <div className='ml-2'>
                <div className='flex  gap-3 items-center'>
                  <p className=' text-sm text-white/70'>{!isMyMessage ? partner.fullName : message.sender?.fullName}</p>
                  <span
                    className={`block text-right text-[10px] text-white/30  ${isMyMessage(message) ? 'text-gray-200' : 'text-gray-400'}`}
                  >
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                      : ''}
                  </span>
                </div>
                <div
                  className={`py-2 -mt-1 rounded-xl max ${isMyMessage(message)
                    ? 'bg[#181A1D] text-white/50 ounded-tr-none'
                    : 'bg[#181A1D] text-white/50 rounded-tl-none'
                    }`}
                >

                  {message.file ? (
                    <a
                      href={message.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-neutral-900 rounded-lg border border-neutral-700 hover:bg-neutral-800"
                    >
                      <div className="bg-purple-600 p-2 rounded-md">
                        <span className="text-white text-xs font-bold">{message.file.type}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{message.file.name}</p>
                        <p className="text-xs text-gray-400">{message.file.size.toFixed(2)} MB</p>
                      </div>
                    </a>) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}


                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 px-6 bg-[#181819] border-t border-neutral-800">
        <div className="flex items-center bg-[#141414] rounded-lg  gap-2">

          <input
            type="text"
            className="flex-1 p-3 bg-neutral-900 text-gray-300 rounded-xl focus:outline-none"
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <label className="cursor-pointer">
            {/* <RiAttachmentLine
              size={24}
              className="text-gray-400 hover:text-gray-200"
            /> */}

            <img src={file} className='w-6 mr-1' alt="" />
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          {/* <button
            onClick={handleSendMessage}
            className="p-2 text-white bg-blue-main rounded-full"
          >

            <RiSendPlane2Fill size={20} />
          </button> */}

          <div onClick={handleSendMessage}>

            <img src={send} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
