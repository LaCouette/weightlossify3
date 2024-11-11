import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AuthPage } from './components/auth/AuthPage';
import { ProfileSetup } from './components/profile/ProfileSetup';
import { Profile } from './components/profile/Profile';
import { LogsHistory } from './components/LogsHistory';
import { PrivateRoute } from './components/auth/PrivateRoute';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/profile-setup"
            element={
              <PrivateRoute>
                <ProfileSetup />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-8">
                    <Profile />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/logs"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-8">
                    <LogsHistory />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-8">
                    <Dashboard />
                  </main>
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}