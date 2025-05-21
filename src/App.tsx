import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Download, Share, ArrowDown, Building2 } from 'lucide-react';
import { useInstallPrompt } from './hooks/useInstallPrompt';
import { useDeviceDetect } from './hooks/useDeviceDetect';
import { WelcomePage } from './components/WelcomePage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

function HomePage() {
  const navigate = useNavigate();
  const { isInstallable, handleInstallClick } = useInstallPrompt();
  const { isIOS } = useDeviceDetect();

  useEffect(() => {
    if (isStandalone) {
      navigate('/welcome', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-12 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-2">
            <Building2 className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">RG Employee Hub</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Access the RG Employee Hub securely from your device.
          </p>
        </div>
        
        {isIOS && !isStandalone ? (
          <div className="space-y-6 bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-900 font-medium">Install on your iOS device</p>
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <Share className="w-5 h-5" />
              <span>Tap Share</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <ArrowDown className="w-5 h-5" />
              <span>Scroll and tap "Add to Home Screen"</span>
            </div>
          </div>
        ) : isInstallable ? (
          <div className="space-y-4">
            <button
              onClick={handleInstallClick}
              className="group relative inline-flex items-center justify-center w-full px-8 py-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              <Download className="w-5 h-5 mr-3 relative" />
              <span className="relative">Install App</span>
            </button>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Login to Hub
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/app" element={<WelcomePage />} />
        <Route
          path="/login"
          element={<Navigate to="https://bolt-diy-9-1747859789261.netlify.app/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
