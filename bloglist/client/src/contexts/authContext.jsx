import { createContext, useReducer, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useNotificationDispatcher } from "/src/components/notification/NotificationContext";
import blogService from "/src/services/blogs";
import loginService from "/src/services/login";

const localKey = "usr";

const authContext = createContext(null);

const reducer = (state, user) => {
  if (user) {
    blogService.setToken(user.token);
    window.localStorage.setItem(localKey, JSON.stringify(user));
  } else {
    blogService.setToken(null);
    window.localStorage.clear();
  }

  return user;
};

export const AuthProvider = (props) => {
  const [user, userDispatch] = useReducer(reducer, null);
  const notify = useNotificationDispatcher();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch(user);
      blogService.setToken(user.token);
    }
  }, []);

  const login = async (loginObj) => {
    try {
      const user = await loginService.login(loginObj);
      userDispatch(user);
      notify({ type: "success", message: `Logged in as '${user.name}'` });
    } catch (err) {
      notify({ type: "error", message: "Wrong credentials" });
      throw new Error("Wrong credentials");
    }
  };

  const logout = () => {
    userDispatch(null);
    navigate("/", { replace: true });
    notify({ type: "success", message: `Logged out successfully` });
  };

  return (
    <authContext.Provider value={[user, { login, logout }]}>
      {props.children}
    </authContext.Provider>
  );
};

export const useUser = () => useContext(authContext)[0];
export const useAuth = () => useContext(authContext)[1];
