
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, Search, User } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 px-4 md:px-6 z-40 glass-morph flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary p-1.5 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-activity"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h1 className="font-display font-semibold text-xl hidden sm:block">
            {APP_NAME}
          </h1>
        </Link>
      </div>

      {!isMobile && (
        <div className="hidden md:flex items-center mx-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-secondary/50"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full overflow-hidden border">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
