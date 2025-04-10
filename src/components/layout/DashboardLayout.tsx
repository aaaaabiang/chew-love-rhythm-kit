
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, Home, Settings, Database } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Dashboard', icon: BarChart3, path: '/dashboard', primary: true },
    { label: 'Admin', icon: Settings, path: '/admin' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-display font-bold text-solarpunk-leaf">
              Chewing Love
            </Link>
            
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={
                    location.pathname === item.path 
                      ? "bg-solarpunk-leaf hover:bg-solarpunk-moss text-white" 
                      : item.primary ? "text-solarpunk-leaf font-medium" : ""
                  }
                  asChild
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </header>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
        <div className="grid grid-cols-3 gap-1 p-2">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-md ${
                location.pathname === item.path 
                  ? "bg-solarpunk-seafoam text-solarpunk-night" 
                  : "text-gray-500"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      
      <main className="flex-grow bg-gray-50 pb-20 md:pb-0">
        {children}
      </main>
      
      <footer className="border-t bg-white">
        <div className="container mx-auto p-4 text-center text-sm text-muted-foreground">
          © 2025 Chewing Love. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
