/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { Venue, Course, Session } from '../types';
import { mockVenues, mockCourses, mockSessions } from '../data/mockData';

interface DataContextType {
  venues: Venue[];
  courses: Course[];
  sessions: Session[];
  addVenue: (venue: Venue) => void;
  updateVenue: (id: string, venue: Partial<Venue>) => void;
  deleteVenue: (id: string) => void;
  assignLecturerToCourse: (courseId: string, lecturerId: string) => void;
  addSession: (session: Session) => void;
  updateSession: (id: string, session: Partial<Session>) => void;
  deleteSession: (id: string) => void;
  importStudents: (students: string[]) => void;
  importLecturers: (lecturers: string[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const getInitialAppData = () => {
  const savedData = localStorage.getItem('appData');
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (error) {
      console.error('Error parsing appData:', error);
    }
  }
  return { venues: mockVenues, courses: mockCourses, sessions: mockSessions };
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [venues, setVenues] = useState<Venue[]>(() => getInitialAppData().venues);
  const [courses, setCourses] = useState<Course[]>(() => getInitialAppData().courses);
  const [sessions, setSessions] = useState<Session[]>(() => getInitialAppData().sessions);

  const saveData = (newVenues: Venue[], newCourses: Course[], newSessions: Session[]) => {
    const dataToSave = { venues: newVenues, courses: newCourses, sessions: newSessions };
    localStorage.setItem('appData', JSON.stringify(dataToSave));
  };

  const addVenue = (venue: Venue) => {
    const newVenues = [...venues, venue];
    setVenues(newVenues);
    saveData(newVenues, courses, sessions);
  };

  const updateVenue = (id: string, updates: Partial<Venue>) => {
    const newVenues = venues.map((v) => (v.id === id ? { ...v, ...updates } : v));
    setVenues(newVenues);
    saveData(newVenues, courses, sessions);
  };

  const deleteVenue = (id: string) => {
    const newVenues = venues.filter((v) => v.id !== id);
    setVenues(newVenues);
    saveData(newVenues, courses, sessions);
  };

  const assignLecturerToCourse = (courseId: string, lecturerId: string) => {
    const newCourses = courses.map((c) => (c.id === courseId ? { ...c, assignedLecturer: lecturerId } : c));
    setCourses(newCourses);
    saveData(venues, newCourses, sessions);
  };

  const addSession = (session: Session) => {
    const newSessions = [...sessions, session];
    setSessions(newSessions);
    saveData(venues, courses, newSessions);
  };

  const updateSession = (id: string, updates: Partial<Session>) => {
    const newSessions = sessions.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setSessions(newSessions);
    saveData(venues, courses, newSessions);
  };

  const deleteSession = (id: string) => {
    const newSessions = sessions.filter((s) => s.id !== id);
    setSessions(newSessions);
    saveData(venues, courses, newSessions);
  };

  const importStudents = (newStudents: string[]) => {
    // This would typically add to a students list stored in context
    // For now, it's just a placeholder
    console.log('Importing students:', newStudents);
  };

  const importLecturers = (newLecturers: string[]) => {
    // This would typically add to a lecturers list stored in context
    // For now, it's just a placeholder
    console.log('Importing lecturers:', newLecturers);
  };

  return (
    <DataContext.Provider
      value={{
        venues,
        courses,
        sessions,
        addVenue,
        updateVenue,
        deleteVenue,
        assignLecturerToCourse,
        addSession,
        updateSession,
        deleteSession,
        importStudents,
        importLecturers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
