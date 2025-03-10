
import React from "react";
import { NavLink } from "react-router-dom";
import { MENU_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  // Dynamically get Lucide icon component by name
  const getIcon = (iconName: string) => {
    const LucideIcon = (Icons as any)[iconName] || Icons.Circle;
    return <LucideIcon className="h-5 w-5" />;
  };

  const sidebarContent = (
    <div className="h-full flex flex-col gap-1 py-4">
      <div className="px-3 py-2">
        <h2 className="text-sm font-medium text-muted-foreground mb-3 px-4">
          MENU
        </h2>
        <nav className="space-y-1 px-2">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={isMobile ? onClose : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
                )
              }
            >
              {getIcon(item.icon)}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto px-5">
        <div className="glass-morph rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-md">
              <Icons.Lightbulb className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">Need help?</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Access our documentation and customer support
          </p>
          <Button variant="outline" size="sm" className="w-full text-xs">
            Support Center
          </Button>
        </div>
      </div>
    </div>
  );

  // When on mobile, render a fixed position sidebar with overlay
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
        <aside
          className={cn(
            "fixed top-0 left-0 h-full w-64 border-r bg-sidebar z-50 shadow-xl transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // On desktop, render a static sidebar
  return (
    <aside className="hidden md:block w-64 h-screen border-r bg-sidebar sticky top-0">
      {sidebarContent}
    </aside>
  );
};

export default Sidebar;
