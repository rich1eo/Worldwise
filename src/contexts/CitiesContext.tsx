import { ReactNode, createContext, useEffect, useReducer } from 'react';

import {
  CitiesAction,
  CitiesContextType,
  ICity,
  ICityPost,
  CitiesReducerType,
  CitiesActionType,
} from '../types/types';

const BASE_URL = 'http://localhost:8000';

export const CitiesContext = createContext<CitiesContextType | null>(null);

const initialState: CitiesReducerType = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: '',
};

function reducer(
  state: CitiesReducerType,
  action: CitiesAction
): CitiesReducerType {
  switch (action.type) {
    case CitiesActionType.Loading:
      return {
        ...state,
        isLoading: true,
      };

    case CitiesActionType.Rejected:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CitiesActionType.CitiesLoaded:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case CitiesActionType.CityCreated:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case CitiesActionType.CityDeleted:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: null,
      };

    case CitiesActionType.CityLoaded:
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    default:
      return initialState;
  }
}

export function CitiesProvider({ children }: { children: ReactNode }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: CitiesActionType.Loading });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error();

        const data: ICity[] = await res.json();
        dispatch({ type: CitiesActionType.CitiesLoaded, payload: data });
      } catch (err) {
        dispatch({
          type: CitiesActionType.Rejected,
          payload: 'There was an error loading data',
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: string) {
    if (Number(id) === currentCity?.id) return;

    dispatch({ type: CitiesActionType.Loading });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error();

      const data: ICity = await res.json();
      dispatch({ type: CitiesActionType.CityLoaded, payload: data });
    } catch (err) {
      dispatch({
        type: CitiesActionType.Rejected,
        payload: 'Fetch Current City Failed!',
      });
    }
  }

  async function createCity(newCity: ICityPost) {
    dispatch({ type: CitiesActionType.Loading });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!res.ok) throw new Error();

      const data: ICity = await res.json();
      dispatch({ type: CitiesActionType.CityCreated, payload: data });
    } catch (err) {
      dispatch({
        type: CitiesActionType.Rejected,
        payload: 'Failed create a new city 😔',
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: CitiesActionType.Loading });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: CitiesActionType.CityDeleted, payload: id });
    } catch {
      dispatch({
        type: CitiesActionType.Rejected,
        payload: 'There was an error during deleting city',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
