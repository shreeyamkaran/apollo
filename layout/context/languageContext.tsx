"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
}

const DEFAULT_LANGUAGE = 'en-US';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<string>(DEFAULT_LANGUAGE);
  
    // Load language from localStorage on mount if it exists
    useEffect(() => {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }, []);
  
    // Update language and save to localStorage
    const changeLanguage = (newLanguage: string) => {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    };
  
    return (
      <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
      throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};