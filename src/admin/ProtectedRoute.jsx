import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

/**
 * Protects admin routes — only authenticated admin users can access.
 * Redirects to /admin/login if not authenticated.
 * Shows access denied if authenticated but not admin.
 */
const ProtectedRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-xs text-yellow-400 uppercase tracking-wider animate-pulse">
            VERIFYING ACCESS...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Logged in but not admin → access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="bg-[#111] border-4 border-red-500 p-8 shadow-[8px_8px_0px_#000] max-w-md text-center">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-extrabold text-white uppercase mb-2">
            ACCESS <span className="text-red-400">DENIED</span>
          </h2>
          <p className="font-sans text-sm text-zinc-400 mb-6">
            Your account does not have administrator privileges. Contact the site owner for access.
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="/"
              className="brutal-btn bg-zinc-800 text-white hover:bg-zinc-700 px-4 py-2.5 font-mono text-xs font-bold"
            >
              GO TO PORTFOLIO
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
