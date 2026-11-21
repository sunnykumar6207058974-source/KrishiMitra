import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('krishi_token');
    const storedUser = localStorage.getItem('krishi_user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('krishi_token');
        localStorage.removeItem('krishi_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (mobileOrEmail, password) => {
    const response = await api.post('/auth/login', {
      mobile_or_email: mobileOrEmail,
      password: password,
    });
    const { access_token, user: userData } = response.data;
    localStorage.setItem('krishi_token', access_token);
    localStorage.setItem('krishi_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    const { access_token, user: newUser } = response.data;
    localStorage.setItem('krishi_token', access_token);
    localStorage.setItem('krishi_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('krishi_token');
    localStorage.removeItem('krishi_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
