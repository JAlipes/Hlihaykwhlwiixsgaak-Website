import { useEffect, useState } from 'react';

// Import Utils
import { GetEnvVarOrFail } from '../utils/GetEnvVarOrFail';

export function UseAuth(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${GetEnvVarOrFail('VITE_BACKEND_URL')}/api/auth/verify`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if(res.ok){
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }

            } catch (err) {
                console.error('Auth Check Failed', err);
                setIsAuthenticated(false);
            }
        }

        checkAuth();
    }, [])

    return { isAuthenticated, setIsAuthenticated} ; 

}