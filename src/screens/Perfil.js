import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataUser } from '../services/LoginService'; 

const Perfil = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener el ID del usuario desde AsyncStorage y luego los datos del usuario desde la API
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('token'); // Suponiendo que el token es el ID del usuario
        if (id) {
          const data = await getDataUser(id);
          setUserData(data);
        } else {
          setError('No se encontró el ID del usuario.');
        }
      } catch (err) {
        setError('Error obteniendo los datos del perfil.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      {userData && (
        <View style={styles.profileContainer}>
          <Text style={styles.infoLabel}>Nombre: <Text style={styles.infoText}>{userData.nombre}</Text></Text>
          <Text style={styles.infoLabel}>Apellido Paterno: <Text style={styles.infoText}>{userData.apellidop}</Text></Text>
          <Text style={styles.infoLabel}>Apellido Materno: <Text style={styles.infoText}>{userData.apellidom}</Text></Text>
          <Text style={styles.infoLabel}>Fecha de Nacimiento: <Text style={styles.infoText}>{userData.fecha}</Text></Text>
          <Text style={styles.infoLabel}>Sexo: <Text style={styles.infoText}>{userData.sexo}</Text></Text>
          <Text style={styles.infoLabel}>Telefono: <Text style={styles.infoText}>{userData.telefono}</Text></Text>
          <Text style={styles.infoLabel}>Nombre de Usuario: <Text style={styles.infoText}>{userData.nombreu}</Text></Text>
          <Text style={styles.infoLabel}>Correo Electrónico: <Text style={styles.infoText}>{userData.email}</Text></Text>
        </View>
      )}

      <Button title="Editar Perfil" onPress={() => navigation.navigate('Editar Perfil')} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E3F2FD',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0D47A1',
  },
  profileContainer: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 18,
    color: '#0D47A1',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#90CAF9',
    paddingBottom: 5,
  },
  infoText: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Perfil;
