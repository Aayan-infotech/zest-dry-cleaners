import { useState, useEffect } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../utils/config';

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('Loading...');

  useEffect(() => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        setCurrentLocation('Location not available');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocode to get address
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const addressComponents = data.results[0].address_components;
              let city = '';
              let country = '';

              // Extract city and country from address components
              for (const component of addressComponents) {
                if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
                  city = component.long_name;
                }
                if (component.types.includes('country')) {
                  country = component.long_name;
                }
              }

              if (city && country) {
                setCurrentLocation(`${city}, ${country}`);
              } else if (city) {
                setCurrentLocation(city);
              } else if (country) {
                setCurrentLocation(country);
              } else {
                setCurrentLocation('Location detected');
              }
            } else {
              setCurrentLocation('Location not found');
            }
          } catch (error) {
            console.error('Error reverse geocoding:', error);
            setCurrentLocation('Location detected');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation('Location unavailable');
        }
      );
    };
    getCurrentLocation();
  }, []);

  return currentLocation;
};

