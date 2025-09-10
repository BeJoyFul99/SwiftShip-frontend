// /app/context/AuthContext.tsx (or in a separate client-side 'context' folder)
"use client"; // This context provider must be a client component

import { User } from "@/types/authForm";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { logoutSubmit } from "@/app/actions/auth-actions";

// Define the shape of your context value
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  logout: () => void;
  isTokenValidate?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to clear user data and potentially redirect
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    logoutSubmit();
    // In a real app, you'd also hit your backend /api/auth/logout endpoint
    // to clear the httpOnly cookie and blacklist the token.
    // router.push('/login'); // Optional: redirect to login after logout
  }, []);

  // Function to check authentication status with the Next.js API route
  const isTokenValidate = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/validate"); // Call your Next.js API route);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        if (data.data?.isValidated) {
          // If authenticated, try to load user from localStorage
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (error) {
              console.error("Failed to parse user from localStorage", error);
              localStorage.removeItem("user");
              logout(); // Clear user if localStorage data is corrupted
            }
          } else {
            // No user in localStorage, but token exists. This could happen if:
            // 1. User cleared localStorage.
            // 2. You only store token in cookie and fetch user profile on auth.
            // In this scenario, you'd typically redirect to fetch profile or re-login
            console.warn(
              "Authenticated token exists, but no user data in localStorage. User might need to re-fetch profile or re-login."
            );
            logout(); // Or just set user to null, and let private routes handle redirect.
          }
        } else {
          // Token is NOT present or invalid according to Next.js API route
          console.log("No valid token found. Logging out user.");
          logout();
        }
      } else {
        // Fetch failed or status code indicates not authenticated
        console.log("Auth status check failed. Logging out user.");
        logout();
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      logout(); // Logout on network errors too
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    setIsLoading(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setIsLoading(false);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, logout, setUser, isTokenValidate, isLoading }}
    >
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
