import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const readStored = () => {
  try {
    return {
      token: localStorage.getItem("token") || null,
      role: localStorage.getItem("role") || null,
      userId: localStorage.getItem("userId") || null,
    };
  } catch {
    return { token: null, role: null, userId: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(readStored);

  const setSession = ({ token, role, userId }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    setAuth({ token, role, userId });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setAuth({ token: null, role: null, userId: null });
  };

  const value = useMemo(
    () => ({
      ...auth,
      isAuthenticated: Boolean(auth.token),
      isAdmin: auth.role === "admin",
      isEmployee: auth.role === "employee",
      setSession,
      logout,
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
