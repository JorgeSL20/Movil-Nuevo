import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AvisoPrivacidad = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aviso de Privacidad</Text>
      {/* Puedes añadir más contenido o estilo aquí si lo deseas */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AvisoPrivacidad;
