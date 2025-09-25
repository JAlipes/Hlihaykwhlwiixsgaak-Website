export interface LoginRequest{
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}