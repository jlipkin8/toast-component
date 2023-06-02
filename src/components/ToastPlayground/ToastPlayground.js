import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';
import styles from './ToastPlayground.module.css';
import { ToastContext } from '../ToastProvider';

function ToastPlayground() {
  const {
    message,
    setMessage,
    variant,
    setVariant,
    setToasts,
    VARIANT_OPTIONS,
    handleAddToast,
  } = React.useContext(ToastContext);
  React.useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setToasts([]);
      }
    }
    window.addEventListener('keydown', handleEscape);
  }, [setToasts]);
  return (
    <form
      onSubmit={(event) => {
        handleAddToast(event, message, variant);
      }}
      className={styles.wrapper}
    >
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />
      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              value={message}
              id="message"
              className={styles.messageInput}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper}`}>
            {VARIANT_OPTIONS.map((option, index) => {
              const inputId = `variant-${option}`;
              return (
                <div className={styles.radioWrapper}>
                  <input
                    id={inputId}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={(event) => {
                      setVariant(event.target.value);
                    }}
                  />
                  <label key={index} htmlFor={inputId}>
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default ToastPlayground;
