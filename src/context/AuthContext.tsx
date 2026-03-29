import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';
import { dummyStudents, dummyLecturers, dummyFacultyAdmin, dummySchoolAdmin } from '../data/dummyData';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  role: UserRole | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

interface LoginCredentials {
  identifier: string;
  password?: string;
  type: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem('authState');
    if (savedAuth) {
      const { user, role, isLoggedIn } = JSON.parse(savedAuth);
      setUser(user);
      setRole(role);
      setIsLoggedIn(isLoggedIn);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    const { identifier, password, type } = credentials;

    let foundUser: User | null = null;

    if (type === 'student') {
      foundUser = dummyStudents.find((s) => s.matricNumber === identifier) || null;
    } else if (type === 'lecturer') {
      // Staff ID: L001, Password: 1234
      if (identifier === 'L001' && password === '1234') {
        foundUser = dummyLecturers.find((l) => l.staffId === 'L001') || null;
      }
    } else if (type === 'faculty') {
      // Email: faculty@science.edu, Password: pass
      if (identifier === 'faculty@science.edu' && password === 'pass') {
        foundUser = dummyFacultyAdmin;
      }
    } else if (type === 'admin') {
      // Email: admin@school.edu, Password: admin
      if (identifier === 'admin@school.edu' && password === 'admin') {
        foundUser = dummySchoolAdmin;
      }
    }

    if (foundUser) {
      setUser(foundUser);
      setRole(type);
      setIsLoggedIn(true);
      localStorage.setItem('authState', JSON.stringify({ user: foundUser, role: type, isLoggedIn: true }));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authState');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
