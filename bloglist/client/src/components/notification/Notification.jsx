import {
  useNotificationValue,
  useNotificationDispatcher,
} from "./NotificationContext";
import "./notification.css";
import { useRef } from "react";

const Notification = () => {
  const notif = useNotificationValue();
  const notify = useNotificationDispatcher();
  const k = useRef(0); // different key to retrigger animation by re-rendering the div on content change
  k.current++;

  if (!notif) return null;

  return (
    <div className="notificationContainer">
      <div
        key={"notification-" + k.current}
        className={`notification ${notif.type ? notif.type : "success"}`}
        onClick={() => notify(null)}
      >
        {notif.message}
      </div>
    </div>
  );
};

export default Notification;
