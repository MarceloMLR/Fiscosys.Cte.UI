import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

const logoUrl = '/logo-completa.png';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

export default function Header({ userName, onLogout }: HeaderProps) {
  return (
    <header className="bg-white/70 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">

      <div className="container mx-auto px-2 sm:px-6 lg:px-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={logoUrl}
              alt="Fiscosys Logo"
              width={420}
              height={40}
              className="h-18 w-auto"
              priority
            />
          </div>

          {/* User Info */}
            <div className="flex items-center space-x-2 mx-7">
            {/* Nome */}
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {userName}
            </span>

            {/* Botão de logout */}
            <Button
                variant="default"
                size="sm"
                onClick={onLogout}
                
                className=" cursor-pointer flex items-center bg-red-500 text-white hover:bg-red-700 hover:text-white"
            >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
            </Button>
            </div>
            
            </div>
      </div>
    </header>
  );
}
