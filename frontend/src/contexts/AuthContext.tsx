import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface UserData {
  uid: number;
  name: string;
  username: string;
  partner_display_name: string;
  partner_id: number;
  db: string;
  server_version: string;
}

interface AuthContextType {
  isConnected: boolean;
  userEmail: string | null;
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// CONFIGURATION
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'; 

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('gravitime_user_email');
    const storedUserData = localStorage.getItem('gravitime_user_data');
    const isSessionActive = localStorage.getItem('gravitime_is_connected') === 'true';

    if (storedEmail && isSessionActive && storedUserData) {
      setIsConnected(true);
      setUserEmail(storedEmail);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call backend authentication endpoint
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Login failed');
      }

      const data = await response.json();

      // Handle response - backend returns 'userData' not 'user'
      if (data.token && data.userData) {
        const userDataToStore: UserData = {
          uid: data.userData.uid,
          name: data.userData.name || '',
          username: data.userData.username || email,
          partner_display_name: data.userData.partner_display_name || data.userData.name || '',
          partner_id: data.userData.partner_id || 0,
          db: data.userData.db || '',
          server_version: data.userData.server_version || '',
        };

        // Store auth token and user data
        localStorage.setItem('gravitime_auth_token', data.token);
        localStorage.setItem('gravitime_is_connected', 'true');
        localStorage.setItem('gravitime_user_email', email);
        localStorage.setItem('gravitime_user_data', JSON.stringify(userDataToStore));
        
        setIsConnected(true);
        setUserEmail(email);
        setUserData(userDataToStore);
      } else {
        throw new Error('Invalid server response: missing token or userData');
      }

    } catch (err) {
      console.error('Login error:', err);
      const message = err instanceof Error ? err.message : 'Login failed. Check connection to backend.';
      setError(message);
      localStorage.removeItem('gravitime_is_connected');
      localStorage.removeItem('gravitime_auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Call backend logout endpoint
    fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('gravitime_auth_token')}`
      }
    }).catch(err => console.error('Logout request failed:', err));

    localStorage.removeItem('gravitime_is_connected');
    localStorage.removeItem('gravitime_user_email');
    localStorage.removeItem('gravitime_user_data');
    localStorage.removeItem('gravitime_auth_token');
    setIsConnected(false);
    setUserEmail(null);
    setUserData(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ isConnected, userEmail, userData, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}