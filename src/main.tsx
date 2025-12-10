import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/animations.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { CartProvider } from './hooks/useCart.tsx'

// Suppress Google Maps Places Autocomplete deprecation warning
// This is just an informational warning for old customers - functionality still works
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  const originalError = console.error;
  
  const shouldSuppress = (message: string): boolean => {
    return message.includes('google.maps.places.Autocomplete is not available to new customers') ||
           message.includes('PlaceAutocompleteElement instead') ||
           message.includes('places-migration-overview') ||
           message.includes('As of March 1st, 2025') ||
           message.includes('google.maps.places.Autocomplete is not scheduled to be discontinued');
  };

  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    if (shouldSuppress(message)) {
      return; // Suppress this specific warning
    }
    originalWarn.apply(console, args);
  };

  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    if (shouldSuppress(message)) {
      return; // Suppress this specific error (in case it's logged as error)
    }
    originalError.apply(console, args);
  };
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
