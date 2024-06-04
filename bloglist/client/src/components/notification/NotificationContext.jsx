import { createContext, useReducer, useContext } from "react";
import { useRef } from "react";

const NotificationContext = createContext();

export const NotificationProvider = (props) => {
  const timeout = useRef(null);

  const [Notification, NotificationDispatcher] = useReducer((state, action) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current === null;
    }
    if (!action) return null;
    timeout.current = setTimeout(
      () => NotificationDispatcher(null),
      action.duration ? action.duration * 1000 : 5000
    );
    return { type: action.type, message: action.message };
  }, null);

  return (
    <NotificationContext.Provider
      value={[Notification, NotificationDispatcher]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => useContext(NotificationContext)[0];
export const useNotificationDispatcher = () =>
  useContext(NotificationContext)[1];

export default NotificationContext;
