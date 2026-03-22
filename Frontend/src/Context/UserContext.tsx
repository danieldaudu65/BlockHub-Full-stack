import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Define what your context holds
interface UserContextType {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  tutorToken: string | null;
  setTutorToken: (token: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [tutorToken, setTutorToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("tutorToken");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsAdmin(payload.admin || false);
        setTutorToken(token);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin, tutorToken, setTutorToken }}>
      {children}
    </UserContext.Provider>
  );
};
// Custom hook to use context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};