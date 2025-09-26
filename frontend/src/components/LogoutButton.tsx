// Import Built In'semibold
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// Import Utils
import { GetEnvVarOrFail } from "../utils/GetEnvVarOrFail";

// Import Context
import { AuthContext } from '../contexts/AuthContext'

export default function LogoutButton(){
    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthContext);

    const HandleLogout = async () => {
        try {
            const res = await fetch(`${GetEnvVarOrFail('VITE_BACKEND_URL')}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            })

            if (res.ok){
                // Add Success Modal
                setIsAuthenticated(false);
                navigate('/')
            } else {
                // Add Failed Modal
                console.error('Logout Failed');
            }

        } catch (err){
            console.error('Error During Logout Process', err);
        }
    }

    return(
        <button 
            onClick={HandleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
            Logout
        </button>
    );
}