
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

// Sample users data (mock data for demo)
const sampleUsers = [
  {
    id: "1",
    name: "Rahul S",
    email: "rahul@nitc.ac.in",
    password: "password",
    avatar: "/lovable-uploads/a1260d53-2c2f-4692-a28c-1fb1211b11b0.png",
    rating: 4.8,
    rideCount: 20
  },
  {
    id: "2",
    name: "Priya K",
    email: "priya@nitc.ac.in",
    password: "password",
    avatar: "/lovable-uploads/e057154a-3158-4bee-bac9-d310e5d6d6dc.png",
    rating: 4.9,
    rideCount: 20
  }
];

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email and password
    const foundUser = sampleUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const emailExists = sampleUsers.some(u => u.email === email);
    if (emailExists) {
      setIsLoading(false);
      throw new Error("Email already registered");
    }
    
    // Create new user
    const newUser = {
      id: (sampleUsers.length + 1).toString(),
      name,
      email,
      rating: 5.0,
      rideCount: 0
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
        isAuthenticated: !!user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
