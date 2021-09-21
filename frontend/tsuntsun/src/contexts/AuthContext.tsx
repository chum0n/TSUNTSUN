import axios from "axios";
import React, { useContext } from "react";

type auth = { isLoggedIn: () => boolean; login: (code: string) => void };

const AuthContext = React.createContext<auth>({
  isLoggedIn: () => false,
  login: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";

  const login = (code: string) => {
    const data = {
      code: code,
      redirect_uri: "https://tsuntsun.herokuapp.com",
      client_id: process.env.REACT_APP_CHANNEL_ID,
      client_secret: process.env.REACT_APP_CHANNEL_SECRET,
    };
    axios
      .post("https://api.line.me/oauth2/v2.1/token", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res);
      });
    localStorage.setItem("isLoggedIn", "true");
    return;
  };

  const value = {
    isLoggedIn,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
