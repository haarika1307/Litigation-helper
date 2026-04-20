"use client";

import { Bell, Search } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  const { open } = useSidebar();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-2" />
        <div className="hidden md:flex relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search cases, evidence, or documents..." 
            className="w-full sm:w-[300px] md:w-[400px] pl-9 bg-muted/50 focus-visible:bg-background" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-blue-600"></span>
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  );
}
