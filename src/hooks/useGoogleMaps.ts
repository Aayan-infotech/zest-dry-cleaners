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
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setIsLoaded(true));
      existingScript.addEventListener('error', () => setLoadError('Failed to load Google Maps'));
      return;
    }

    if (!apiKey) {
      setLoadError('Google Places API key is not set');
      return;
    }

    // Create and load the script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geocoding`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
    };
    
    script.onerror = () => {
      setLoadError('Failed to load Google Maps script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      const scriptToRemove = document.querySelector(`script[src*="${apiKey}"]`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [apiKey]);

  return { isLoaded, loadError };
};

