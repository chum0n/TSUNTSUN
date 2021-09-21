import axios from "axios";
import React, { useContext } from "react";

type auth = {
  isLoggedIn: () => boolean;
  login: () => string;
  afterLogin: (code: string, string: string) => void;
};

const AuthContext = React.createContext<auth>({
  isLoggedIn: () => false,
  login: () => "",
  afterLogin: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";

  const login = () => {
    console.log("login");
    const state = Math.random().toString(32).substring(2);
    const nonce = Math.random().toString(32).substring(2);
    localStorage.setItem("state", state);
    localStorage.setItem("nonce", nonce);
    const href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.REACT_APP_CHANNEL_ID}&redirect_uri=https://tsuntsun.herokuapp.com/afterLogin&state=${state}&scope=profile%20openid&nonce=${nonce}&bot_prompt=aggressive`;
    return href;
  };

  const afterLogin = (code: string, state: string) => {
    const inputState = localStorage.getItem("state");
    if (inputState !== state) {
      localStorage.setItem("isLoggedIn", "false");
      return;
    }
    console.log("login");
    const data = {
      code: code,
      redirect_uri: "https://tsuntsun.herokuapp.com/afterLogin",
      client_id: process.env.REACT_APP_CHANNEL_ID,
      client_secret: process.env.REACT_APP_CHANNEL_SECRET,
    };
    axios
      .post("https://api.line.me/oauth2/v2.1/token", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((res) => console.log("catchres", res));
    localStorage.setItem("isLoggedIn", "true");
    return;
  };

  const value = {
    isLoggedIn,
    login,
    afterLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
