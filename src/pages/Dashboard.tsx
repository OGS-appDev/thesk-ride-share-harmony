
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRides } from "@/contexts/RideContext";
import AppHeader from "@/components/AppHeader";
import RideCard from "@/components/RideCard";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const { upcomingRides, recentRides } = useRides();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button 
            className="flex items-center justify-center gap-2 h-14 bg-primary hover:bg-primary/90"
            onClick={() => navigate("/find-ride")}
          >
            <Search size={20} />
            <span>Find a Ride</span>
          </Button>
          
          <Button 
            className="flex items-center justify-center gap-2 h-14 bg-secondary hover:bg-secondary/90"
            onClick={() => navigate("/create-ride")}
          >
            <Plus size={20} />
            <span>Create a Ride</span>
          </Button>
        </div>
        
        {upcomingRides.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Upcoming Rides</h2>
            <div>
              {upcomingRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} type="upcoming" />
              ))}
            </div>
          </section>
        )}
        
        {recentRides.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Recent Rides</h2>
            <div>
              {recentRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} type="recent" />
              ))}
            </div>
          </section>
        )}

        {upcomingRides.length === 0 && recentRides.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium text-gray-700">No rides yet</h3>
            <p className="text-gray-500 mt-2">Create or find a ride to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
