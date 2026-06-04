import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import ReviewDetail from "./pages/ReviewDetail";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<><Header /><About /><Footer /></>} />
            <Route path="/reviews/:slug" element={<><Header /><ReviewDetail /><Footer /></>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/friends" element={<><Header /><Friends /><Footer /></>} />
            <Route path="/profile" element={<><Header /><Profile /><Footer /></>} />
            <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
