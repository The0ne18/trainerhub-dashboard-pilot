
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "@/context/RoleContext";
import MainLayout from "@/components/layout/MainLayout";
import ClientLayout from "@/components/layout/ClientLayout";
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import ClientProfile from "@/pages/ClientProfile";
import WorkoutBuilder from "@/pages/WorkoutBuilder";
import Progress from "@/pages/Progress";
import CalendarPage from "@/pages/Calendar";
import NotFound from "@/pages/NotFound";
import Landing from "@/pages/Landing";

// Client pages
import ClientDashboard from "@/pages/client/Dashboard";
import ClientWorkouts from "@/pages/client/Workouts";
import ClientSchedule from "@/pages/client/Schedule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            
            {/* Trainer Routes */}
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
            
            {/* Client Routes */}
            <Route path="/client/dashboard" element={
              <ClientLayout>
                <ClientDashboard />
              </ClientLayout>
            } />
            <Route path="/client/workouts" element={
              <ClientLayout>
                <ClientWorkouts />
              </ClientLayout>
            } />
            <Route path="/client/schedule" element={
              <ClientLayout>
                <ClientSchedule />
              </ClientLayout>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
