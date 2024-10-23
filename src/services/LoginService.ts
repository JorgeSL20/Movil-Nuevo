import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://proyectogatewayback-production.up.railway.app/';

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${url}auth/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuario por email', error);
    throw error;
  }
};

export const crearUsuario = async (userNew) => {
  try {
    const response = await axios.post(`${url}auth`, userNew);
    return response.data;
  } catch (error) {
    console.error('Error creando usuario', error);
    throw error;
  }
};

export const cambiarPassword = async (newPassword, email) => {
  try {
    const response = await axios.patch(`${url}auth/password/${email}`, newPassword);
    return response.data;
  } catch (error) {
    console.error('Error cambiando contraseña', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${url}login`, credentials);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token); // Guardar token en AsyncStorage
    }
    return response.data;
  } catch (error) {
    console.error('Error en el login', error);
    throw error;
  }
};

export const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem('token');
  return !!token; // Devuelve true si el token existe
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token'); // Elimina el token del almacenamiento local
  } catch (error) {
    console.error('Error al hacer logout', error);
  }
};

export const getDataUser = async (id) => {
  try {
    const response = await axios.get(`${url}auth/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo datos de usuario', error);
    throw error;
  }
};

// Otros métodos como updateUser, getDataInformacion, checkEmail seguirían el mismo patrón
