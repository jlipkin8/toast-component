import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

  const [toasts, setToasts] = React.useState([]);
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = React.useState('');

  function handleAddToast(event, message, variant) {
    event.preventDefault();
    const newToast = {
      message,
      variant,
      id: crypto.randomUUID(),
    };
    const nextToasts = [...toasts, newToast];
    setToasts(nextToasts);
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }

  function handleDismiss(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }
  const value = {
    message,
    setMessage,
    variant,
    setVariant,
    VARIANT_OPTIONS,
    toasts,
    handleDismiss,
    handleAddToast,
  };
  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
