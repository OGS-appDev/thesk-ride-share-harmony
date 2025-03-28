
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRides } from "@/contexts/RideContext";
import AppHeader from "@/components/AppHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const RideDetails = () => {
  const { isAuthenticated, user } = useAuth();
  const { findRideById, bookRide } = useRides();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isBooking, setIsBooking] = useState(false);
  
  const ride = id ? findRideById(id) : undefined;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!ride) {
      toast({
        title: "Ride not found",
        description: "The ride you're looking for doesn't exist",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [ride, navigate]);

  if (!ride) {
    return null;
  }

  const handleBookRide = () => {
    if (!ride || !user) return;
    
    setIsBooking(true);
    
    // Process booking
    setTimeout(() => {
      try {
        bookRide(ride.id);
        toast({
          title: "Ride booked",
          description: "Your booking has been confirmed",
        });
        navigate("/dashboard");
      } catch (error) {
        toast({
          title: "Booking failed",
          description: "Something went wrong, please try again",
          variant: "destructive",
        });
      } finally {
        setIsBooking(false);
      }
    }, 1000);
  };

  const isDriver = user?.id === ride.driverId;

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Ride Details" />
      
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <button 
          className="flex items-center text-gray-600 mb-6 hover:text-primary transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back</span>
        </button>
        
        <div className="bg-white rounded-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={ride.driverAvatar} alt={ride.driverName} />
              <AvatarFallback>{ride.driverName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-medium text-lg">{ride.driverName}</h3>
              <div className="flex items-center text-gray-600 text-sm">
                <span className="mr-1">{ride.driverRating}</span>
                <span>★</span>
                {ride.driverRating && (
                  <span className="ml-1">{ride.rideCount} rides</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6 space-y-4">
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[7px] before:top-8 before:bottom-6 before:w-[2px] before:bg-gray-200">
              <div className="relative">
                <div className="absolute left-[-22px] top-1 w-4 h-4 rounded-full bg-primary"></div>
                <p className="font-medium">{ride.from}</p>
                {ride.fromDetails && (
                  <p className="text-sm text-gray-600">{ride.fromDetails}</p>
                )}
              </div>
              
              <div className="relative mt-8">
                <div className="absolute left-[-22px] top-1 w-4 h-4 rounded-full bg-red-500"></div>
                <p className="font-medium">{ride.to}</p>
                {ride.toDetails && (
                  <p className="text-sm text-gray-600">{ride.toDetails}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm text-gray-600 mb-1">Date & Time</h4>
              <p className="font-medium">{new Date(ride.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}, {ride.time}</p>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm text-gray-600 mb-1">Price per seat</h4>
              <p className="font-medium text-blue-500">₹{ride.price}</p>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm text-gray-600 mb-1">Available seats</h4>
              <p className="font-medium">{ride.seats}</p>
            </div>
          </div>
          
          {ride.notes && (
            <div className="mb-6">
              <h4 className="font-medium mb-2">Additional Notes</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{ride.notes}</p>
            </div>
          )}
          
          {!isDriver && ride.seats > 0 ? (
            <Button 
              className="w-full" 
              onClick={handleBookRide}
              disabled={isBooking}
            >
              {isBooking ? "Processing..." : "Book Ride"}
            </Button>
          ) : isDriver ? (
            <p className="text-center text-gray-600">This is your ride</p>
          ) : (
            <p className="text-center text-gray-600">No seats available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideDetails;
