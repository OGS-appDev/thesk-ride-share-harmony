import React, { createContext, useContext, useState, useEffect } from "react";

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  rating?: number;
  rideCount?: number;
};

// Define auth context types
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      console.log("printing");
    }
    console.log("User from local storage:", JSON.parse(storedUser));
    console.log(isLoggedIn);
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user with matching email and password
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (data.status === true) {
      const { password, ...userWithoutPassword } = data;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    } else {
      throw new Error("Invalid email or password");
    }
    setIsLoading(false);
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    // Mock signup delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Register Request
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const user = await response.json();

    // Check if email already exists
    if (!response.ok) {
      setIsLoading(false);
      throw new Error(user.message || "Email already exists");
    }

    // Create new user
    const newUser = {
      id: user.userId,
      name,
      email,
      rating: 5.0,
      rideCount: 0,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: localStorage.getItem("user") ? true : false,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
