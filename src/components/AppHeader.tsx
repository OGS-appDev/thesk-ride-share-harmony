
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

const AppHeader: React.FC<{ title?: string }> = ({ title = "NITC RideShare" }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-gray-100 bg-white py-3 px-4 flex justify-between items-center">
      <div 
        className="flex items-center cursor-pointer" 
        onClick={() => navigate("/dashboard")}
      >
        <div className="text-primary mr-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18C7 16.3431 8.34315 15 10 15H14C15.6569 15 17 16.3431 17 18V18C17 19.6569 15.6569 21 14 21H10C8.34315 21 7 19.6569 7 18V18Z" fill="currentColor"/>
            <path d="M17 18V18C17 16.3431 18.3431 15 20 15H20C21.6569 15 23 16.3431 23 18V18C23 19.6569 21.6569 21 20 21H20C18.3431 21 17 19.6569 17 18Z" fill="currentColor"/>
            <path d="M1 18V18C1 16.3431 2.34315 15 4 15H4C5.65685 15 7 16.3431 7 18V18C7 19.6569 5.65685 21 4 21H4C2.34315 21 1 19.6569 1 18Z" fill="currentColor"/>
            <path d="M4 8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V13.5C20 13.7761 19.7761 14 19.5 14H4.5C4.22386 14 4 13.7761 4 13.5V8Z" fill="currentColor"/>
            <path d="M6 8H18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M6 11H18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="font-bold text-gray-900">{title}</span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-primary focus:outline-none">
          <Bell size={20} />
        </button>
        {user && (
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
