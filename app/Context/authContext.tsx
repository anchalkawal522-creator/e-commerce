"use client";

import { createContext, useContext, useState, useEffect } from "react";

type User = {
  name: string;
  role: "admin" | "user";
};

type AuthType = {
  user: User | null;
  loginAsAdmin: () => void;
  loginAsUser: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType | null>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const loginAsAdmin = () => {
    const admin = { name: "Admin", role: "admin" as const };
    setUser(admin);
    localStorage.setItem("user", JSON.stringify(admin));
  };

  const loginAsUser = () => {
    const user = { name: "User", role: "user" as const };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, loginAsUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside provider");
  return context;
};
