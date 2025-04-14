// components/Alert.js
import { useEffect, useState } from 'react';



type AlertProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info' | 'cart' | 'cancel';
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    onConfirm?: () => void;
  };


  export default function Alert({
    isOpen,
    onClose,
    title,
    message,
    type = 'info',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    showCancel = false,
    onConfirm = () => {},
  }: AlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  if (!isVisible) return null;
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        );
      case 'cart':
        return (
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        );
      case 'cancel':
        return (
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
          </svg>
        );
    }
  };
  
  const getHeaderColor = () => {
    switch (type) {
      case 'success':
      case 'cart':
        return 'bg-white border-b border-gray-200';
      case 'error':
      case 'cancel':
        return 'bg-white border-b border-gray-200';
      case 'warning':
        return 'bg-white border-b border-gray-200';
      case 'info':
      default:
        return 'bg-white border-b border-gray-200';
    }
  };
  
  const getPrimaryButtonColor = () => {
    switch (type) {
      case 'success':
      case 'info':
      case 'cart':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'error':
      case 'cancel':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'warning':
        return 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return 'bg-green-600 hover:bg-green-700 text-white';
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/30 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-lg w-full max-w-sm mx-4 overflow-hidden shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-4'}`}>
        <div className={`px-4 py-3 flex items-center ${getHeaderColor()}`}>
          <div className="mr-3">
            {getIcon()}
          </div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
        
        <div className="p-4">
          <p className="text-gray-700 mb-4 text-center">{message}</p>
          
          <div className="flex justify-center space-x-3">
            {showCancel && (
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium focus:outline-none"
                onClick={onClose}
              >
                {cancelText}
              </button>
            )}
            
            <button
              className={`px-4 py-2 rounded-md font-medium focus:outline-none ${getPrimaryButtonColor()}`}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}