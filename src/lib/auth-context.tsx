"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "./api";

interface User {
  id: number;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      handleRedirect();
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (error) {
      console.error("Auth failed:", error);
      localStorage.removeItem("token");
      setUser(null);
      handleRedirect();
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    const publicPaths = ["/login", "/register", "/forgot-password"];
    if (!user && !publicPaths.includes(pathname)) {
      router.push("/login");
    } else if (user && publicPaths.includes(pathname)) {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!loading) {
      handleRedirect();
    }
  }, [pathname, user, loading]);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    checkUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
