import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationContextProvider } from "/src/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Router>
);
