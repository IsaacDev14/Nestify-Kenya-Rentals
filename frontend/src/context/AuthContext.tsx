import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    isHost: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Mock user data
            const mockUser: User = {
                id: 1,
                name: email.split("@")[0],
                email: email,
                isHost: false,
            };

            setUser(mockUser);
            return true;
        } catch (error) {
            return false;
        }
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            const mockUser: User = {
                id: Date.now(),
                name: name,
                email: email,
                isHost: false,
            };

            setUser(mockUser);
            return true;
        } catch (error) {
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
