'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function AuthHeader() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    const loadingToast = toast.loading('Signing you out...');
    try {
      await logout();
      toast.success('Logged out successfully', { id: loadingToast });
    } catch (error) {
      toast.error('Error logging out', { id: loadingToast });
    }
  };

  if (loading) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-[#285E67]">WellBalance</div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center">
            <div className="text-2xl font-bold text-[#285E67]">WellBalance</div>
          </Link>

          {user ? (
            // User is authenticated
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Welcome back, {user.firstName}!</p>
                  <p className="text-xs text-gray-500">Continue your wellness journey</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#285E67] to-[#1e4a52] rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-[#285E67] text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // User is not authenticated
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-[#285E67] font-medium text-sm transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-[#285E67] text-white rounded-lg font-medium text-sm h-10 px-5 flex items-center justify-center hover:bg-[#1e4a52] transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
