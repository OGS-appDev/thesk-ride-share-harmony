
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RideProvider } from "./contexts/RideContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import FindRide from "./pages/FindRide";
import CreateRide from "./pages/CreateRide";
import RideDetails from "./pages/RideDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RideProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/find-ride" element={<FindRide />} />
              <Route path="/create-ride" element={<CreateRide />} />
              <Route path="/ride/:id" element={<RideDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RideProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
