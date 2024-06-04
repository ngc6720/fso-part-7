import { useNotificationValue } from "/src/NotificationContext";

const Notification = () => {
  const notif = useNotificationValue();

  const styleSuccess = {
    color: "rgb(29, 88, 69)",
    background: "rgb(235, 254, 248)",
    border: "1px solid rgb(188, 254, 233)",
    padding: 10,
    marginBottom: 5,
  };
  const styleError = {
    color: "rgb(132, 21, 43)",
    background: "rgb(255, 243, 246)",
    border: "1px solid rgb(255, 189, 203)",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notif) return null;

  return (
    <div style={notif.type === "error" ? styleError : styleSuccess}>
      {notif.msg}
    </div>
  );
};

export default Notification;
