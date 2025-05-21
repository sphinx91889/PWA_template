import React from 'react';
import { Building2 } from 'lucide-react';

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50">
            <Building2 className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome to RG Hub!</h1>
          <p className="text-lg text-gray-500">
            Thank you for installing the RG Employee Hub. Click the button below to login.
          </p>
          <a
            href="https://bolt-diy-9-1747859789261.netlify.app/"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors duration-200"
          >
            Login to Hub
          </a>
        </div>
      </div>
    </div>
  );
}