import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { getServicios } from '../services/LoginService'; // Asegúrate de que la ruta sea correcta

const Servicios = ({ navigation }) => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar un indicador de carga

  useEffect(() => {
    // Función para obtener los servicios desde la API
    const fetchServicios = async () => {
      try {
        const response = await getServicios();
        setServicios(response);
        setLoading(false); // Finaliza la carga cuando los datos son obtenidos
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
        setLoading(false); // Finaliza la carga en caso de error
      }
    };

    fetchServicios(); // Llama a la función al cargar el componente
  }, []);

  // Si está cargando, muestra el indicador de carga
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando servicios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicios disponibles</Text>

      {/* Lista de servicios */}
      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id_servicio.toString()} // Asegúrate de que el ID sea único
        renderItem={({ item }) => (
          <View style={styles.serviceItem}>
            <Text style={styles.serviceName}>{item.nombre}</Text>
            <Text style={styles.serviceCost}>${item.costo}</Text>
            {/* Componente de imagen */}
            <Image
              source={{ uri: item.imagen }} // Asegúrate de que `item.imagen` sea una URL válida
              style={styles.serviceImage} // Estilos de la imagen
            />
            <Text style={styles.serviceDescription}>{item.descripcion}</Text>

            <Button title="Agendar" onPress={() => navigation.navigate('Agendar')} color="#007BFF" />

          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  serviceItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
  },
  serviceCost: {
    fontSize: 16,
    color: '#28a745',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
  },
  serviceImage: {
    width: '100%', // Tamaño de la imagen
    height: 150, // Puedes ajustar este valor según tus necesidades
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Servicios;
