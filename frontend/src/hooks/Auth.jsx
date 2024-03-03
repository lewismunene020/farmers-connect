import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
const AuthContext = createContext();
import { showErrors } from "./Notification";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export { api };

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (token && token !== "") {
      api["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("user.token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("user.token");
    const user = localStorage.getItem("user");
    if (token) {
      setToken(token);
    }
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const register = async (
    email,
    first_name,
    last_name,
    password,
    is_farmer
  ) => {
    try {
      let { data } = await api.post("/register/", {
        email: email.trim(),
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        password: password.trim(),
        is_farmer: is_farmer,
      });
      return data;
    } catch (error) {
      showErrors(error);
    }
  };

  const login = async (email, password) => {
    try {
      let { data } = await api.post("/login/", {
        email: email.trim(),
        password: password.trim(),
      });

      // console.log(`DATA IS :${JSON.stringify(data)}`);

      if (data.token) {
        setToken(data.token);
        setUser({
          id: data.id,
          email: data.email,
          username: data.username,
          profile: data.profile,
          is_farmer: data.is_farmer,
        });
        return data;
      }
    } catch (error) {
      showErrors(error);
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("user.token");
    localStorage.removeItem("user");
    location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setToken,
        api,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
