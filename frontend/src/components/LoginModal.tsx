import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetEnvVarOrFail } from '../utils/GetEnvVarOrFail';

// Import Types
import type { LoginRequest, LoginResponse } from '../../../shared-types/AuthTypes';

// Import Hooks
import { UseAuth } from '../hooks/UseAuth';

// Import Contexts
import { AuthContext } from '../contexts/AuthContext'

export default function LoginModal() {
    const navigate = useNavigate(); 
    const { setIsAuthenticated } = useContext(AuthContext);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const HandleLogin = async (e: React.FormEvent) => {
        try{
            e.preventDefault();

            const body: LoginRequest = { email, password };

            const res = await fetch(`${GetEnvVarOrFail('VITE_BACKEND_URL')}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                credentials: 'include'
            });

            const data: LoginResponse = await res.json();

            if (res.ok) {
                setIsAuthenticated(true);
                navigate("/"); // close modal
            } else {
                alert(data?.message || 'Login failed');
            }
        }catch(err){
            console.error('Error During Login Process', err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background overlay with blur */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => navigate("/")}></div>

            {/* Modal content */}
            <div className="relative bg-white p-8 rounded-2xl shadow-xl w-96 z-10">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        onChange= {(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
                        onClick={HandleLogin}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
