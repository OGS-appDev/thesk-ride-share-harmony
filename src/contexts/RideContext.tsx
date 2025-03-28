
import React, { createContext, useContext, useState, useEffect } from "react";

// Define ride type
export type Ride = {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar?: string;
  driverRating?: number;
  rideCount?: number; // Added rideCount property
  from: string;
  fromDetails?: string;
  to: string;
  toDetails?: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  notes?: string;
  status: "upcoming" | "completed" | "cancelled";
};

// Define ride context types
type RideContextType = {
  rides: Ride[];
  findRideById: (id: string) => Ride | undefined;
  addRide: (ride: Omit<Ride, "id" | "status">) => void;
  bookRide: (rideId: string) => void;
  filterRides: (from: string, to: string, date: string) => Ride[];
  upcomingRides: Ride[];
  recentRides: Ride[];
};

// Create the ride context
const RideContext = createContext<RideContextType | null>(null);

// Sample rides data (mock data for demo)
const sampleRides: Ride[] = [
  {
    id: "1",
    driverId: "2",
    driverName: "Priya K",
    driverAvatar: "/lovable-uploads/e057154a-3158-4bee-bac9-d310e5d6d6dc.png",
    driverRating: 4.9,
    rideCount: 15, // Added rideCount data
    from: "NITC Campus",
    fromDetails: "Main Gate",
    to: "Calicut Airport",
    toDetails: "Terminal 1",
    date: new Date().toISOString().split('T')[0],
    time: "3:30 PM",
    seats: 2,
    price: 400,
    status: "upcoming"
  },
  {
    id: "2",
    driverId: "1",
    driverName: "Rahul S",
    driverAvatar: "/lovable-uploads/a1260d53-2c2f-4692-a28c-1fb1211b11b0.png",
    driverRating: 4.8,
    rideCount: 20, // Added rideCount data
    from: "NITC",
    to: "Airport",
    date: new Date().toISOString().split('T')[0],
    time: "2:30 PM",
    seats: 2,
    price: 400,
    status: "upcoming"
  },
  {
    id: "3",
    driverId: "2",
    driverName: "Priya K",
    driverAvatar: "/lovable-uploads/e057154a-3158-4bee-bac9-d310e5d6d6dc.png",
    driverRating: 4.9,
    rideCount: 15, // Added rideCount data
    from: "NITC",
    to: "Kozhikode City",
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    time: "5:00 PM",
    seats: 0,
    price: 200,
    status: "completed"
  }
];

// Custom hook to use the ride context
export const useRides = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error("useRides must be used within a RideProvider");
  }
  return context;
};

// Ride provider component
export const RideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rides, setRides] = useState<Ride[]>(sampleRides);

  // Find ride by ID
  const findRideById = (id: string) => {
    return rides.find(ride => ride.id === id);
  };

  // Add a new ride
  const addRide = (ride: Omit<Ride, "id" | "status">) => {
    const newRide: Ride = {
      ...ride,
      id: (rides.length + 1).toString(),
      status: "upcoming"
    };
    setRides([...rides, newRide]);
  };

  // Book a ride (decrease available seats)
  const bookRide = (rideId: string) => {
    setRides(
      rides.map(ride =>
        ride.id === rideId && ride.seats > 0
          ? { ...ride, seats: ride.seats - 1 }
          : ride
      )
    );
  };

  // Filter rides based on criteria
  const filterRides = (from: string, to: string, date: string) => {
    return rides.filter(
      ride =>
        ride.status === "upcoming" &&
        (from === "" || ride.from.toLowerCase().includes(from.toLowerCase())) &&
        (to === "" || ride.to.toLowerCase().includes(to.toLowerCase())) &&
        (date === "" || ride.date === date) &&
        ride.seats > 0
    );
  };

  // Get upcoming rides
  const upcomingRides = rides.filter(
    ride => ride.status === "upcoming" && new Date(ride.date + "T" + ride.time) > new Date()
  ).sort((a, b) => {
    const dateA = new Date(a.date + "T" + a.time);
    const dateB = new Date(b.date + "T" + b.time);
    return dateA.getTime() - dateB.getTime();
  });

  // Get recent rides
  const recentRides = rides.filter(
    ride => ride.status === "completed" || (ride.status === "upcoming" && new Date(ride.date + "T" + ride.time) <= new Date())
  ).sort((a, b) => {
    const dateA = new Date(a.date + "T" + a.time);
    const dateB = new Date(b.date + "T" + b.time);
    return dateB.getTime() - dateA.getTime();
  }).slice(0, 5);

  return (
    <RideContext.Provider
      value={{
        rides,
        findRideById,
        addRide,
        bookRide,
        filterRides,
        upcomingRides,
        recentRides
      }}
    >
      {children}
    </RideContext.Provider>
  );
};
