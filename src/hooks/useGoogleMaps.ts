import { useEffect, useState } from 'react';

export const useGoogleMaps = (apiKey: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if ((window as any).google && (window as any).google.maps) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    // const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    // if (existingScript) {
    //   existingScript.addEventListener('load', () => setIsLoaded(true));
    //   existingScript.addEventListener('error', () => setLoadError('Failed to load Google Maps'));
    //   return;
    // }

    // Check if script is already being loaded or loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      // Script exists, wait for it to load
      const checkLoaded = setInterval(() => {
        if ((window as any).google && (window as any).google.maps) {
          setIsLoaded(true);
          clearInterval(checkLoaded);
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkLoaded);
        if (!(window as any).google || !(window as any).google.maps) {
          setLoadError('Google Maps script failed to load');
        }
      }, 10000);
      
      return;
    }

    // Create and load the Google Maps script with API key in URL
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geocoding&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Wait a bit for Google Maps to fully initialize
      const checkLoaded = setInterval(() => {
        if ((window as any).google && (window as any).google.maps) {
          setIsLoaded(true);
          clearInterval(checkLoaded);
        }
      }, 100);
      
      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkLoaded);
        if (!(window as any).google || !(window as any).google.maps) {
          setLoadError('Google Maps failed to initialize after script load');
        }
      }, 5000);
    };
    
    script.onerror = () => {
      setLoadError('Failed to load Google Maps script. Please check your API key and network connection.');
    };
    
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Don't remove the script on cleanup as it might be used by other components
    };
  }, [apiKey]);

  return { isLoaded, loadError };
};

