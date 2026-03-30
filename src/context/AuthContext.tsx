/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { User, UserRole } from '../types';
import { mockStudents, mockLecturers, mockFacultyAdmins, mockSchoolAdmin } from '../data/mockData';

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

const getInitialAuthState = () => {
  const savedAuth = localStorage.getItem('authState');
  if (savedAuth) {
    try {
      return JSON.parse(savedAuth);
    } catch (error) {
      console.error('Error parsing authState:', error);
    }
  }
  return { isLoggedIn: false, user: null, role: null };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => getInitialAuthState().isLoggedIn);
  const [user, setUser] = useState<User | null>(() => getInitialAuthState().user);
  const [role, setRole] = useState<UserRole | null>(() => getInitialAuthState().role);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    const { identifier, password, type } = credentials;

    let foundUser: User | null = null;

    if (type === 'student') {
      const student = mockStudents.find((s) => s.matricNumber === identifier);
      if (student) foundUser = { ...student, role: 'student', email: '' } as User;
    } else if (type === 'lecturer') {
      const lecturer = mockLecturers.find((l) => l.verificationCode === identifier);
      if (lecturer) foundUser = { ...lecturer, role: 'lecturer', email: lecturer.email } as User;
    } else if (type === 'faculty') {
      const faculty = mockFacultyAdmins.find((f) => f.email === identifier && f.password === password);
      if (faculty) foundUser = { ...faculty, role: 'faculty' } as User;
    } else if (type === 'admin') {
      if (identifier === mockSchoolAdmin.email && password === mockSchoolAdmin.password) {
        foundUser = { ...mockSchoolAdmin, role: 'admin' } as User;
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
