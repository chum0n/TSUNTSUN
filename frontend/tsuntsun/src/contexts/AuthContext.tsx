import axios from "axios";
import React, { useContext } from "react";

type auth = {
  isLoggedIn: () => boolean;
  idToken: () => string | null;
  accessToken: () => string | null;
  getloginHref: () => string;
  getToken: (code: string, string: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

const AuthContext = React.createContext<auth>({
  isLoggedIn: () => false,
  idToken: () => "",
  accessToken: () => "",
  getloginHref: () => "",
  getToken: async () => false,
  logout: async () => false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";
  const idToken = () => localStorage.getItem("idToken");
  const accessToken = () => localStorage.getItem("accessToken");

  const getloginHref = () => {
    const state = Math.random().toString(32).substring(2);
    const nonce = Math.random().toString(32).substring(2);
    localStorage.setItem("state", state);
    localStorage.setItem("nonce", nonce);
    const href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.REACT_APP_CHANNEL_ID}&redirect_uri=https://tsuntsun.herokuapp.com/after-login&state=${state}&scope=profile%20openid&nonce=${nonce}&bot_prompt=aggressive`;
    return href;
  };

  const getToken = async (code: string, state: string): Promise<boolean> => {
    // stateの確認
    const inputState = localStorage.getItem("state");
    console.log("login", inputState, state, code, isLoggedIn());

    if (inputState !== state) {
      localStorage.setItem("isLoggedIn", "false");
      return false;
    }
    // stateなど一時保存したものの削除
    localStorage.setItem("state", "");
    localStorage.setItem("nonce", "");

    // tokenの取得
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://tsuntsun.herokuapp.com/after-login");
    params.append("client_id", process.env.REACT_APP_CHANNEL_ID ?? "");
    params.append("client_secret", process.env.REACT_APP_CHANNEL_SECRET ?? "");
    await axios
      .post("https://api.line.me/oauth2/v2.1/token", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("afterlogin", res);
        // tokenの保存
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("idToken", res.data.id_token);
        localStorage.setItem("isLoggedIn", "true");
      })
      .catch((res) => {
        console.log("catch res", res);
        localStorage.setItem("accessToken", "");
        localStorage.setItem("idToken", "");
        localStorage.setItem("isLoggedIn", "false");
      });
    return isLoggedIn();
  };

  const logout = async (): Promise<boolean> => {
    const href = `https://api.line.me/oauth2/v2.1/revoke?client_id=${
      process.env.REACT_APP_CHANNEL_ID
    }&client_secret=${
      process.env.REACT_APP_CHANNEL_SECRET
    }&accessToken=${accessToken()}`;
    await axios
      .post(href, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", "");
        localStorage.setItem("idToken", "");
        localStorage.setItem("isLoggedIn", "false");
        return true;
      })
      .catch(() => {
        return false;
      });
    return false;
  };

  const value = {
    isLoggedIn,
    idToken,
    accessToken,
    getloginHref,
    getToken,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
