import { ReactNode, createContext, useEffect, useState } from 'react';
import { ICity } from '../types/types';

const BASE_URL = 'http://localhost:8000';

type CitiesContextType = {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity | null;
  getCity(id: string): void;
};

export const CitiesContext = createContext<CitiesContextType | null>(null);

interface CitiesProviderProps {
  children: ReactNode;
}

export function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<ICity | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error('Fetch Failed!');

        const data: ICity[] = await res.json();
        setCities(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error('Fetch Current City Failed!');

      const data: ICity = await res.json();
      setCurrentCity(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
