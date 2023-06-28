import { ReactNode, createContext, useReducer } from 'react';

import {
  AuthAction,
  AuthActionType,
  AuthContextType,
  AuthStateType,
} from '../types/types';

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

export const AuthContext = createContext<AuthContextType | null>(null);

const initialState: AuthStateType = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: AuthStateType, action: AuthAction): AuthStateType {
  switch (action.type) {
    case AuthActionType.Login:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case AuthActionType.Logout:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return initialState;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispath] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispath({ type: AuthActionType.Login, payload: FAKE_USER });
    }
  }

  function logout() {
    dispath({ type: AuthActionType.Logout });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
