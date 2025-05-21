import React from 'react';
import { Rocket } from 'lucide-react';

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50">
            <Rocket className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome!</h1>
          <p className="text-lg text-gray-500">
            Thank you for installing our app. You're all set to start using the full experience.
          </p>
        </div>
      </div>
    </div>
  );
}