
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CareerCompass from "./pages/CareerCompass";
import StudyBuddy from "./pages/StudyBuddy";
import DailyPlanner from "./pages/DailyPlanner";
import IdealType from "./pages/IdealType";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/career-compass" element={<CareerCompass />} />
          <Route path="/study-buddy" element={<StudyBuddy />} />
          <Route path="/daily-planner" element={<DailyPlanner />} />
          <Route path="/ideal-type" element={<IdealType />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
