import { useState, useEffect } from 'react';

// Retro Window Animation
export const RetroWindowAnimation = ({ 
  show, 
  title, 
  children, 
  onClose 
}: { 
  show: boolean; 
  title: string; 
  children: React.ReactNode; 
  onClose: () => void;
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#c0c0c0',
        border: '2px solid',
        borderTopColor: '#dfdfdf',
        borderLeftColor: '#dfdfdf',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        minWidth: '300px',
        zIndex: 1000,
        animation: 'slideDown 0.3s ease-out',
        fontFamily: '"MS Sans Serif", Arial, sans-serif',
        fontSize: '11px'
      }}
    >
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes minimize {
          from {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
          to {
            transform: translateX(-50%) scale(0.1);
            opacity: 0;
          }
        }
      `}</style>

      {/* Title Bar */}
      <div
        style={{
          backgroundColor: '#000080',
          color: '#dfdfdf',
          padding: '2px 2px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '11px',
          cursor: 'move'
        }}
      >
        <span>{title}</span>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              width: '16px',
              height: '14px',
              padding: '0',
              fontSize: '10px',
              border: '2px outset',
              borderTopColor: '#dfdfdf',
              borderLeftColor: '#dfdfdf',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              backgroundColor: '#c0c0c0',
              cursor: 'pointer'
            }}
          >
            _
          </button>
          <button
            onClick={onClose}
            style={{
              width: '16px',
              height: '14px',
              padding: '0',
              fontSize: '10px',
              border: '2px outset',
              borderTopColor: '#dfdfdf',
              borderLeftColor: '#dfdfdf',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              backgroundColor: '#c0c0c0',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div style={{ padding: '4px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

// Taskbar Notification
export const TaskbarNotification = ({ 
  message, 
  duration = 2000 
}: { 
  message: string; 
  duration?: number;
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '10px',
        backgroundColor: '#c0c0c0',
        border: '2px solid',
        borderTopColor: '#dfdfdf',
        borderLeftColor: '#dfdfdf',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        padding: '4px 8px',
        fontSize: '11px',
        fontFamily: '"MS Sans Serif", Arial, sans-serif',
        zIndex: 999,
        animation: 'slideUp 0.3s ease-out',
        maxWidth: '200px'
      }}
    >
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      {message}
    </div>
  );
};

// Minimize Animation Hook
export const useRetroAnimation = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showNotify = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  return {
    showNotification,
    notificationMessage,
    showNotify,
    setShowNotification
  };
};
