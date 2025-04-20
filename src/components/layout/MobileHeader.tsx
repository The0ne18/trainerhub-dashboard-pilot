
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  ChartLine,
  Menu,
  X,
  Calendar,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MobileHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { label: 'Clients', icon: Users, href: '/clients' },
    { label: 'Workouts', icon: Dumbbell, href: '/workouts' },
    { label: 'Progress', icon: ChartLine, href: '/progress' },
    { label: 'Calendar', icon: Calendar, href: '/calendar' },
  ];
  
  const handleNavigation = (href: string) => {
    navigate(href);
    setOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white border-b p-4">
      <div className="flex items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center">
                <Dumbbell className="h-6 w-6 text-trainer-purple mr-2" />
                <span className="font-bold text-lg">TrainerHub</span>
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleNavigation(item.href)}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center ml-2">
          <Dumbbell className="h-6 w-6 text-trainer-purple" />
          <span className="font-bold ml-2">TrainerHub</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default MobileHeader;
