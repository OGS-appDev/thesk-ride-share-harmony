
import { useNavigate } from "react-router-dom";
import { Ride } from "@/contexts/RideContext";
import { formatPrice } from "@/lib/utils";

type RideCardProps = {
  ride: Ride;
  type?: "upcoming" | "recent" | "search";
};

const RideCard: React.FC<RideCardProps> = ({ ride, type = "upcoming" }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/ride/${ride.id}`);
  };

  // Icon components
  const PlaneIcon = () => (
    <span className="text-primary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12.5H18.5L15.5 20L10.5 4L7.5 12.5H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );

  const LocationIcon = () => (
    <span className="text-green-500">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );

  return (
    <div 
      className="bg-white rounded-lg p-4 mb-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          {type === "upcoming" ? <PlaneIcon /> : <LocationIcon />}
          <div className="ml-2">
            <h3 className="font-medium text-gray-900">{ride.from} to {ride.to}</h3>
            <p className="text-sm text-gray-500">
              {type === "upcoming" ? "Tomorrow" : "Yesterday"}, {ride.time}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-semibold ${ride.price > 300 ? "text-blue-500" : "text-green-500"}`}>
            ₹{formatPrice(ride.price)}
          </p>
          {type === "search" && ride.seats > 0 && (
            <p className="text-xs text-gray-500">{ride.seats} seats left</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideCard;
