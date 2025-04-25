import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import ClientProfile from "@/pages/ClientProfile";
import WorkoutBuilder from "@/pages/WorkoutBuilder";
import Progress from "@/pages/Progress";
import CalendarPage from "@/pages/Calendar";
import NotFound from "@/pages/NotFound";
import Landing from "@/pages/Landing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/clients" element={
            <MainLayout>
              <Clients />
            </MainLayout>
          } />
          <Route path="/clients/:id" element={
            <MainLayout>
              <ClientProfile />
            </MainLayout>
          } />
          <Route path="/workouts" element={
            <MainLayout>
              <WorkoutBuilder />
            </MainLayout>
          } />
          <Route path="/progress" element={
            <MainLayout>
              <Progress />
            </MainLayout>
          } />
          <Route path="/calendar" element={
            <MainLayout>
              <CalendarPage />
            </MainLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
