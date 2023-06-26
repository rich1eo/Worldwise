import { useContext } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';

export function useCities() {
  const citiesContext = useContext(CitiesContext);

  if (!citiesContext) {
    throw new Error('useCities has to be used within <CitiesProvider>');
  }

  return citiesContext;
}
