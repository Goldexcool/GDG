'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LandingPage } from "@/components/LandingPage";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [loading, user, router]);

  // Don't render anything while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#285E67]"></div>
      </div>
    );
  }

  // Only show landing page if user is not signed in
  if (!user) {
    return <LandingPage />;
  }

  // This shouldn't render as the redirect should happen, but just in case
  return null;
}
