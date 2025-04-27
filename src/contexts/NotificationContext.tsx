import React, { createContext, useState, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

type NotificationType = 'error' | 'success';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (type: NotificationType, message: string) => void;
  hideNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (type: NotificationType, message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    
    // Auto-dismiss after a set time
    setTimeout(() => {
      hideNotification(id);
    }, type === 'error' ? 5000 : 3000);
  };

  const hideNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Notification Components
export const NotificationContainer: React.FC = () => {
  const { notifications, hideNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`backdrop-blur-sm border rounded-lg shadow-lg max-w-md p-4 ${
              notification.type === 'error'
                ? 'bg-rose-500/20 border-rose-500/40'
                : 'bg-emerald-500/20 border-emerald-500/40'
            }`}
          >
            <div className="flex">
              {notification.type === 'error' ? (
                <AlertCircle className="text-rose-400 flex-shrink-0 mr-3" />
              ) : (
                <CheckCircle className="text-emerald-400 flex-shrink-0 mr-3" />
              )}
              <div className="flex-1">
                <h3 className={`font-medium mb-1 ${
                  notification.type === 'error' ? 'text-rose-300' : 'text-emerald-300'
                }`}>
                  {notification.type === 'error' ? 'Error' : 'Success'}
                </h3>
                <p className="text-white/80 text-sm">{notification.message}</p>
              </div>
              <button 
                onClick={() => hideNotification(notification.id)}
                className="text-white/60 hover:text-white ml-2"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}; 