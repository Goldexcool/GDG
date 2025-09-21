'use client';

import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app load time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#285E67] rounded-full animate-spin mx-auto mb-4"></div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">WellBalance</h2>
          <p className="text-gray-600">Loading your wellness journey...</p>
        </div>
        
        {/* Loading progress animation */}
        <div className="mt-6 w-48 mx-auto">
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-[#285E67] h-2 rounded-full animate-pulse" style={{
              animation: 'loadProgress 1.5s ease-in-out'
            }}></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes loadProgress {
          0% { width: 0% }
          50% { width: 60% }
          100% { width: 100% }
        }
      `}</style>
    </div>
  );
}
