import React from 'react';
import {  PiBag } from 'react-icons/pi';
import { type Notification } from '../../../../data/activitiesData';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  dayjs.extend(relativeTime);

  const formatTimeAgo = (date: string) => {
    const now = dayjs();
    const then = dayjs(date);
    const diffInMinutes = now.diff(then, 'minute');
    const diffInHours = now.diff(then, 'hour');
    const diffInDays = now.diff(then, 'day');

    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${diffInDays}d`;
  };

  const renderAvatar = () => {
    if (notification.avatar && notification.type === 'job_application') {
      return (
        <img
          src={notification.avatar}
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }
    return (
      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
        <PiBag size={24} className="text-purple-400" />
      </div>
    );
  };

  return (
    <div className="flex items-start gap-2 bg-[#181A1D] rounded-xl p-4 shadow-lg">
      {renderAvatar()}
      <div className="flex-1 ml-4 text-white/80">
        <p className="text-xs">
          {/* {notification.senderName && <span className="font-bold">{notification.senderName} </span>} */}
          {notification.message}
          {/* {notification.jobTitle && <span className="font-bold">{notification.jobTitle}</span>} */}
        </p>
      </div>
      <span className="text-xs text-gray-500">
        {formatTimeAgo(notification.createdAt)}
      </span>
    </div>
  );
};

export default NotificationItem;