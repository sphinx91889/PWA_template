import React from 'react';
import { Building2, LogIn } from 'lucide-react';

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-12 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50">
            <Building2 className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome to RG Hub!</h1>
          <p className="text-lg text-gray-500">
            Thank you for installing the RG Employee Hub.
          </p>
        </div>
        <a
          href="https://bolt-diy-9-1747859789261.netlify.app/"
          className="group relative inline-flex items-center justify-center w-full px-8 py-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
        >
          <LogIn className="w-5 h-5 mr-3" />
          <span>Login to Hub</span>
        </a>
      </div>
    </div>
  );