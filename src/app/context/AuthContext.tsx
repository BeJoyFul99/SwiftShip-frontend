// /app/context/AuthContext.tsx (or in a separate client-side 'context' folder)
"use client"; // This context provider must be a client component

import { User } from "@/types/authForm";
import { createContext, useContext, useState, useEffect } from "react";

// Define the shape of your context value
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // To indicate initial loading of user data

  // Optional: Rehydrate user from localStorage on initial load if token exists
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user"); // Clear corrupted data
      }
    }
    setIsLoading(false);
  }, []);

  // Optional: Save user to localStorage whenever it changes (for persistence across refreshes)
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context easily
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
