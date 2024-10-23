import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { addCita, getServicios } from '../services/LoginService';
import DateTimePicker from '@react-native-community/datetimepicker';

const Agendar = () => {
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hora, setHora] = useState('');
  const [selectedServicio, setSelectedServicio] = useState('');
  const [dentista, setDentista] = useState('');
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    getServicios().then(data => setServicios(data)).catch(error => console.error(error));
  }, []);

  const handleAgendar = async () => {
    // Validación para todos los campos requeridos
    if (!fecha || !hora || !selectedServicio || !dentista) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    }

    // Validación para que la fecha no sea un día pasado
    const hoy = new Date();
    if (fecha < hoy.setHours(0, 0, 0, 0)) {
      Alert.alert('Error', 'La fecha seleccionada no puede ser en el pasado.');
      return;
    }

    try {
      const idByToken = await AsyncStorage.getItem('token');
      if (!idByToken) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        return;
      }
      const cita = {
        fecha: fecha.toISOString().split('T')[0],
        hora,
        motivo: selectedServicio,
        dentista,
      };
      const response = await addCita(cita, idByToken);
      if (response.status === 200) {
        Alert.alert('Éxito', 'Cita agendada correctamente');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema al agendar la cita');
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === 'ios');
    setFecha(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Cita</Text>

      {/* Fecha */}
      <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()} // Asegura que no se puedan seleccionar fechas pasadas
        />
      )}
      <Text style={styles.selectedDateText}>
        Fecha seleccionada: {fecha.toISOString().split('T')[0]}
      </Text>

      {/* Hora */}
      <Picker
        selectedValue={hora}
        onValueChange={(itemValue) => setHora(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione la hora" value="" />
        <Picker.Item label="09:00 AM" value="09:00:00" />
        <Picker.Item label="09:30 AM" value="09:30:00" />
        <Picker.Item label="10:00 AM" value="10:00:00" />
        <Picker.Item label="10:30 AM" value="10:30:00" />
      </Picker>

      {/* Motivo */}
      <Picker
        selectedValue={selectedServicio}
        onValueChange={(itemValue) => setSelectedServicio(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un motivo" value="" />
        {servicios.map((servicio) => (
          <Picker.Item key={servicio.id} label={servicio.nombre} value={servicio.nombre} />
        ))}
      </Picker>

      {/* Dentista */}
      <Picker
        selectedValue={dentista}
        onValueChange={(itemValue) => setDentista(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un dentista" value="" />
        <Picker.Item label="Juan Perez" value="Juan Perez" />
        <Picker.Item label="Luis Hernandez" value="Luis Hernandez" />
        <Picker.Item label="Steven Univers" value="Steven Univers" />
      </Picker>

      <Button title="Agendar" onPress={handleAgendar} />
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
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  selectedDateText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Agendar;
