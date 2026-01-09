import React from 'react';
import { Activity } from 'lucide-react';
import ProfileDropdown from '@/components/profile/ProfileDropdown';
import { useAuth } from '@/contexts/AuthContext';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">CarePath</h1>
        </div>

        {/* User Profile */}
        {user && <ProfileDropdown />}
      </div>
    </header>
  );
};


