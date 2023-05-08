import React, { useEffect, useContext } from "react";
import { Input, Notification, Button } from "@canonical/react-components";
export interface ToastProps {
  id: string;
  destroy: () => void;
  title?: string;
  content?: string;
  duration?: number;
  type: string;
  position: string;
  isDarkMode?: boolean;
}

const ToastType = ["positive", "negative", "warning"];
const ToastPosition = ["top-right", "top-left", "bottom-left", "bottom-right"];

const Toast: React.FC<ToastProps> = (props) => {
  const {
    position,
    destroy,
    content,
    title,
    duration = 0,
    id,
    type,
    isDarkMode,
  } = props;

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [destroy, duration]);

  return (
    <div
      className={`notification-container ${position} color--${
        isDarkMode ? "dark" : "light"
      } `}
    >
      {/* <div className={`p-notification--${type} ${isDarkMode ? "is-dark" : ""}`}> */}
      {/*  <div className="p-notification__content">
          {title && <h5 className="p-notification__title">{title}</h5>}
          {content && <p className="p-notification__message">{content}</p>}
          <button
            className="p-notification__close"
            aria-controls="notification"
            onClick={destroy}
          >
            Close
          </button>
        </div>*/}

      <Notification
        borderless
        className={`text-color--${isDarkMode ? "dark" : "light"}`}
        severity={type}
        title={title}
        style={{ color: isDarkMode ? "white" : "black" }}
      >
        <button
          className="p-notification__close"
          aria-controls="notification"
          onClick={destroy}
        >
          Close
        </button>

        {content}
      </Notification>
    </div>
  );
};

const shouldRerender = (prevProps: ToastProps, nextProps: ToastProps) => {
  return prevProps.id === nextProps.id;
};

export default React.memo(Toast, shouldRerender);
