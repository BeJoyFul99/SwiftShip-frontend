"use client"; // This context provider must be a client component
import { User } from "@/types/authForm";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { logoutRequest } from "@/app/actions/auth-actions";

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
  // Function to clear user data and notify backend
  const logout = useCallback(async () => {
    setUser(null);
    setIsLoading(false);
    await logoutRequest(); // Notify backend
  }, []);

  // Function to check authentication status with the Next.js API route
  const isTokenValidate = useCallback(
    async (forceLoad = false) => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/auth/validate");
        if (res.ok) {
          const data = await res.json();
          if (data.isValidated) {
            console.log(data);

            // Update user from API if not present or forcing
            if (!user || forceLoad) {
              if (data.user) {
                setUser({
                  ...data.user,
                });
              }
            }
          } else {
            logout();
          }
        } else if (res.status === 401 || res.status === 400) {
          res.json().then((data) => {
            console.log(data);
            if (data && data.message != "No token") {
              logout();
            }
          });
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [user, logout]
  );
  useEffect(() => {
    isTokenValidate();
  }, []);

  // // Check token validity on page visibility change
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (!document.hidden && user) {
  //       isTokenValidate();
  //     }
  //   };
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () =>
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  // }, [user, isTokenValidate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        setUser,
        isTokenValidate,
        isLoading,
      }}
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
