
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dumbbell,
  Calendar,
  LogOut,
  Menu,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRole } from '@/context/RoleContext';
import { toast } from "sonner";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { setRole } = useRole();
  
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/client/dashboard' },
    { label: 'My Workouts', icon: Dumbbell, href: '/client/workouts' },
    { label: 'Schedule', icon: Calendar, href: '/client/schedule' },
  ];
  
  const handleNavigation = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem('userRole');
    navigate('/');
    toast.success("Logged out successfully");
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-blue-50">
      {/* Sidebar (desktop only) */}
      {!isMobile && (
        <div className="w-64 bg-white h-screen flex flex-col border-r border-blue-100">
          <div className="p-4 flex items-center gap-2 border-b">
            <Dumbbell className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-xl">ClientHub</span>
          </div>
          
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Button
                    variant={location.pathname.startsWith(item.href) ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      location.pathname.startsWith(item.href) ? "bg-blue-500 hover:bg-blue-600" : ""
                    }`}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-blue-100">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header (mobile only) */}
        {isMobile && (
          <header className="sticky top-0 z-30 flex items-center justify-between bg-white border-b p-4">
            <div className="flex items-center">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="active:scale-95 transition-transform"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="left" 
                  className="p-0 w-[80%] sm:w-[385px]"
                >
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b flex items-center">
                      <Dumbbell className="h-6 w-6 text-blue-500 mr-2" />
                      <span className="font-bold text-lg">ClientHub</span>
                    </div>
                    <nav className="flex-1 p-4 overflow-y-auto">
                      <ul className="space-y-2">
                        {navItems.map((item) => (
                          <li key={item.label}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start active:scale-95 transition-transform"
                              onClick={() => handleNavigation(item.href)}
                            >
                              <item.icon className="h-5 w-5 mr-3" />
                              {item.label}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <div className="p-4 border-t">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-500"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Log Out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center ml-2">
                <Dumbbell className="h-6 w-6 text-blue-500" />
                <span className="font-bold ml-2">ClientHub</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="active:scale-95 transition-transform"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </header>
        )}
        
        {/* Page Content */}
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ClientLayout;
