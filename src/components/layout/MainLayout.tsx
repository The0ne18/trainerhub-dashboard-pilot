
import React from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar (desktop only) */}
      {!isMobile && <Sidebar />}
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header (mobile only) */}
        {isMobile && <MobileHeader />}
        
        {/* Page Content */}
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
