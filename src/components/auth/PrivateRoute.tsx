import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUserStore } from '../../stores/userStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading: authLoading } = useAuthStore();
  const { profile, fetchProfile, isLoading: profileLoading } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    if (user?.uid && !profile) {
      fetchProfile(user.uid);
    }
  }, [user?.uid, fetchProfile, profile]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If no profile exists or setup isn't completed, redirect to profile setup
  // But only if we're not already on the profile setup page
  if ((!profile || !profile.setupCompleted) && location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }

  // If profile setup is completed and user tries to access /profile-setup, redirect to home
  if (profile?.setupCompleted && location.pathname === '/profile-setup') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}