import React from 'react';
import NotificationItem from './NotificationItem';
import { PiEnvelopeSimple } from 'react-icons/pi';
import type { Notification } from '../../../../data/activitiesData';

// Type definition for each notification

interface NotificationListProps {
  notifications?: Notification[] | null;
}



const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {

  
  if (!Array.isArray(notifications) || notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-gray-500">
        <PiEnvelopeSimple size={64} className="mb-4" />
        <h2 className="text-xl font-bold mb-2">No Notification</h2>
        <p className="text-center text-sm px-8">
          No notification yet, you will see all your activities and messages here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id || notification._id || Math.random().toString()}
          notification={notification}
        />))}
    </div>
  );
};

export default NotificationList;
