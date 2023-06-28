import { useContext } from 'react';
import { AuthContext } from '../contexts/FakeAuthContext';

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (authContext === undefined)
    throw new Error('useAuth has to be used within <AuthProvider>');

  return authContext;
}
