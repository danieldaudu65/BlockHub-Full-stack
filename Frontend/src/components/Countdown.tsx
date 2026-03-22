import React, { useEffect, useState } from 'react';

const Countdown: React.FC<{ expiresAt: string }> = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(expiresAt).getTime();
      let diff = Math.floor((target - now) / 1000); // in seconds

      if (diff <= 0) {
        setTimeLeft('Expired');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (60 * 60 * 24));
      diff -= days * 60 * 60 * 24;

      const hours = Math.floor(diff / (60 * 60));
      diff -= hours * 60 * 60;

      const minutes = Math.floor(diff / 60);
      diff -= minutes * 60;

      const seconds = diff;

      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0 || parts.length > 0) parts.push(`${hours}h`);
      if (minutes > 0 || parts.length > 0) parts.push(`${minutes}m`);
      parts.push(`${seconds}s`);

      setTimeLeft(parts.join(' '));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="text-xs text-white/80 px-2 py-1 rounded absolute bottom-2 right-2">
      {timeLeft}
    </div>
  );
};

export default Countdown;
