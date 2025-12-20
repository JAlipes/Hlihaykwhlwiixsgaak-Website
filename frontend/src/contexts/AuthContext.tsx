import { createContext, useEffect, useState } from 'react';

// Import Utils
import { GetEnvVarOrFail } from '../utils/GetEnvVarOrFail';

// Import Types
import type { ReactNode } from 'react';
import type { AuthContextType } from '../../../shared-types/AuthTypes';

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${GetEnvVarOrFail('VITE_BACKEND_URL')}/api/auth/verify`, {
                    method: 'GET',
                    credentials: 'include',
                });
                
                const data = await res.json();
                setIsAuthenticated(data.isAuthenticated === true);
                
            } catch (err) {
                console.error('Auth Check Failed', err);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
