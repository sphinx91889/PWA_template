import { useState, useEffect } from 'react';

export function useDeviceDetect() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /safari/.test(userAgent);
    
    // Detect iOS Safari (but not other browsers on iOS that might support install prompt)
    setIsIOS(isIOSDevice && isSafari);
  }, []);

  return { isIOS };
}