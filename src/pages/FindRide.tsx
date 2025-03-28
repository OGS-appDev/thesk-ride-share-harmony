
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRides, Ride } from "@/contexts/RideContext";
import AppHeader from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { formatDateForDisplay } from "@/lib/utils";

const FindRide = () => {
  const { isAuthenticated } = useAuth();
  const { filterRides } = useRides();
  const navigate = useNavigate();
  
  const [from, setFrom] = useState("NITC Campus");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [searchResults, setSearchResults] = useState<Ride[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = filterRides(from, to, date);
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Find a Ride" />
      
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <button 
          className="flex items-center text-gray-600 mb-6 hover:text-primary transition-colors"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back</span>
        </button>
        
        <form onSubmit={handleSearch} className="bg-white rounded-lg p-6 mb-6 border border-gray-100">
          <div className="space-y-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <Input
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="NITC Campus"
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
                placeholder="Where to?"
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
              />
            </div>
            
            <Button type="submit" className="w-full">Search Rides</Button>
          </div>
        </form>
        
        {hasSearched && (
          <div>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((ride) => (
                  <div 
                    key={ride.id} 
                    className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/ride/${ride.id}`)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={ride.driverAvatar} alt={ride.driverName} />
                        <AvatarFallback>{ride.driverName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{ride.driverName}</h3>
                            <div className="flex items-center text-gray-500 text-sm">
                              <span className="mr-1">{ride.driverRating}</span>
                              <span>★</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-blue-500">₹{ride.price}</p>
                            <p className="text-xs text-gray-500">{ride.seats} seats left</p>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center text-sm">
                          <span className="text-primary mr-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 12.5H18.5L15.5 20L10.5 4L7.5 12.5H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <span>{ride.from} to {ride.to}</span>
                        </div>
                        
                        <div className="mt-1 text-xs text-gray-500">
                          {formatDateForDisplay(ride.date)}, {ride.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="font-medium text-gray-800">No rides found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindRide;
