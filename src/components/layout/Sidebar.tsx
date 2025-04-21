
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  ChartLine,
  Calendar, 
  Bell, 
  Search,
  ArrowDown
} from 'lucide-react';

type NavItem = {
  label: string;
  icon: React.ElementType;
  href: string;
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { label: 'Clients', icon: Users, href: '/clients' },
    { label: 'Workouts', icon: Dumbbell, href: '/workouts' },
    { label: 'Progress', icon: ChartLine, href: '/progress' },
    { label: 'Calendar', icon: Calendar, href: '/calendar' },
  ];
  
  const handleNavigation = (href: string) => {
    navigate(href);
  };

  // Helper to check if the item's href matches the current path
  const isActive = (href: string) => {
    // Root path match or sub-paths match
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };
  
  return (
    <div className={cn(
      "h-screen bg-sidebar sticky top-0 transition-all duration-300 flex flex-col border-r border-sidebar-border",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo and Header */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-trainer-purple" />
            <span className="font-bold text-xl">TrainerHub</span>
          </div>
        )}
        {collapsed && <Dumbbell className="h-6 w-6 text-trainer-purple mx-auto" />}
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ArrowDown className={cn(
            "h-4 w-4 transition-transform",
            collapsed ? "rotate-90" : "-rotate-90"
          )} />
        </Button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Button
                variant={isActive(item.href) ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-3",
                  isActive(item.href) && "bg-trainer-purple hover:bg-trainer-dark-purple"
                )}
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")} />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Bottom Actions */}
      <div className="p-2 border-t border-sidebar-border flex gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        {!collapsed && (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
