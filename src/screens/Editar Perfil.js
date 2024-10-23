import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser, getDataUser } from '../services/LoginService';

const EditarPerfil = ({ navigation }) => {
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidop, setApellidop] = useState('');
  const [apellidom, setApellidom] = useState('');
  const [email, setEmail] = useState('');
  const [sexo, setSexo] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombreu, setNombreu] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUser = await AsyncStorage.getItem('token');
        const userData = await getDataUser(idUser);
        setDataUser(userData);
        setNombre(userData.nombre);
        setApellidop(userData.apellidop);
        setApellidom(userData.apellidom);
        setEmail(userData.email);
        setSexo(userData.sexo);
        setFecha(userData.fecha);
        setTelefono(userData.telefono);
        setNombreu(userData.nombreu);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateAge = (birthdate) => {
    const today = new Date();
    const birthDateObj = new Date(birthdate);
    if (birthDateObj > today) {
      return 'La fecha no puede ser del futuro';
    }

    const age = today.getFullYear() - birthDateObj.getFullYear();
    if (age < 18) {
      return 'La persona debe ser mayor de 18 años';
    }

    return null; // Si es válido
  };

  const handleUpdate = async () => {
    const ageError = validateAge(fecha);
    if (ageError) {
      Alert.alert('Error', ageError);
      return;
    }

    const idUser = await AsyncStorage.getItem('token');
    try {
      await updateUser(idUser, {
        nombre,
        apellidop,
        apellidom,
        email,
        sexo,
        fecha,
        telefono,
        nombreu,
      });
      Alert.alert('Éxito', 'Datos actualizados correctamente');
    } catch (err) {
      console.error('Error actualizando usuario', err);
      Alert.alert('Error', 'Error actualizando usuario. Inténtalo de nuevo más tarde.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido Paterno"
            value={apellidop}
            onChangeText={setApellidop}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido Materno"
            value={apellidom}
            onChangeText={setApellidom}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Sexo"
            value={sexo}
            onChangeText={setSexo}
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha de Nacimiento"
            value={fecha}
            onChangeText={setFecha}
            keyboardType="datetime"
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre de Usuario"
            value={nombreu}
            onChangeText={setNombreu}
          />
          <Button title="Actualizar Datos" onPress={handleUpdate} color="#3C8C36" />
          <View style={styles.separator} />
          <Button title="Volver al Inicio" onPress={() => navigation.navigate('Home')} color="#007BFF" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  separator: {
    height: 20, // Ajusta la altura según lo que necesites
  },
});

export default EditarPerfil;
