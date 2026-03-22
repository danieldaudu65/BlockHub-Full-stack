import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import NotificationList from './NotificationList';
import { API_URL } from '../../../../confiq';
import type { Notification } from '../../../../data/activitiesData';
import { ClipLoader } from 'react-spinners';



const socket: Socket = io(API_URL);

const NotificationHandler: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    //  Fetch userId by sending token in body
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch(`${API_URL}/user_activity/get_user_id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
            .then(res => res.json())
            .then(data => {
                if (data?.userId) {
                    setUserId(data.userId);
                }
            })
            .catch(err => console.error('Failed to fetch user ID', err));
    }, []);

    //  Handle socket connection
    useEffect(() => {
        if (!userId) return;

        // Join socket room
        socket.emit('join', userId);

        // Fetch old notifications from backend
        fetch(`${API_URL}/user_activity/get_notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data?.Notifications)) {

                    setNotifications(data.Notifications); // set the past notifications
                    console.log(setNotifications);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch past notifications', err);
                setLoading(false); // ✅ Always stop loading
            });
        // Listen for new notifications
        const handleNotification = (notification: Notification) => {
            setNotifications(prev => [notification, ...prev]);
        };

        socket.on('notification', handleNotification);

        return () => {
            socket.off('notification', handleNotification);
        };
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <ClipLoader size={32} color="#4F46E5" />
            </div>
        );
    }

    return <NotificationList notifications={notifications} />;
};

export default NotificationHandler;
