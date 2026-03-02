import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'user' | 'admin';

interface AuthContextType {
    role: UserRole;
    setRole: (role: UserRole) => void;
    logout: () => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<UserRole>('user');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        setIsLoggedIn(false);
        setRole('user');
    };

    return (
        <AuthContext.Provider value={{ role, setRole, logout, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
