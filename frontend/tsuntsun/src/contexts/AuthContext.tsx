import axios from "axios";
import React, { useContext } from "react";

type auth = {
  isLoggedIn: () => Promise<boolean>;
  idToken: () => string | null;
  accessToken: () => string | null;
  getloginHref: () => string;
  getToken: (code: string, string: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<auth>({
  isLoggedIn: async () => false,
  idToken: () => "",
  accessToken: () => "",
  getloginHref: () => "",
  getToken: async () => false,
  logout: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const idToken = () => localStorage.getItem("idToken");
  const accessToken = () => localStorage.getItem("accessToken");

  const isLoggedIn = async () => {
    const params = new URLSearchParams();
    params.append("accessToken", accessToken() ?? "");
    let verifyed = false;
    await axios
      .post("https://api.line.me/oauth2/v2.1/verify", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(() => (verifyed = true));

    return verifyed;
  };

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
        // tokenの保存
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("idToken", res.data.id_token);
      })
      .catch((res) => {
        console.log("catch res", res);
        localStorage.setItem("accessToken", "");
        localStorage.setItem("idToken", "");
      });
    return isLoggedIn();
  };

  const logout = async (): Promise<void> => {
    const params = new URLSearchParams();
    params.append("accessToken", accessToken() ?? "");
    params.append("client_id", process.env.REACT_APP_CHANNEL_ID ?? "");
    params.append("client_secret", process.env.REACT_APP_CHANNEL_SECRET ?? "");
    await axios
      .post("https://api.line.me/oauth2/v2.1/revoke", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("idToken", "");
      });
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
