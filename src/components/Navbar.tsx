
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="font-pixel text-2xl text-dharma-purple">
          PixelX <span className="text-dharma-dark">Dharma Flow</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        <Button variant="ghost" size="icon">
          <Menu size={20} />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
