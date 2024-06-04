import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { NotificationProvider } from "/src/components/notification/NotificationContext";
import { AuthProvider } from "/src/contexts/authContext";
import { QueryProvider } from "/src/contexts/queryContext";
import Notification from "/src/components/notification/Notification";

import App from "./App";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <Router>
      <AuthProvider>
        <QueryProvider>
          <Notification />
          <App />
        </QueryProvider>
      </AuthProvider>
    </Router>
  </NotificationProvider>
);
