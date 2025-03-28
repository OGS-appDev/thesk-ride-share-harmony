
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRides } from "@/contexts/RideContext";
import AppHeader from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const CreateRide = () => {
  const { isAuthenticated, user } = useAuth();
  const { addRide } = useRides();
  const navigate = useNavigate();
  
  const [from, setFrom] = useState("NITC Campus");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("2");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      addRide({
        driverId: user.id,
        driverName: user.name,
        driverAvatar: user.avatar,
        driverRating: user.rating,
        from,
        to,
        date,
        time,
        seats: parseInt(seats),
        price: parseFloat(price),
        notes
      });
      
      toast({
        title: "Ride created",
        description: "Your ride has been successfully created",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error creating ride",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Create a Ride" />
      
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <button 
          className="flex items-center text-gray-600 mb-6 hover:text-primary transition-colors"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back</span>
        </button>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border border-gray-100">
          <div className="space-y-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <Input
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <Input
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination"
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-1">Available Seats</label>
              <Input
                id="seats"
                type="number"
                min="1"
                max="6"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price per seat</label>
              <Input
                id="price"
                type="number"
                min="1"
                placeholder="Amount in ₹"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <Textarea
                id="notes"
                placeholder="Any specific pickup points or requirements."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              Create Ride
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRide;
