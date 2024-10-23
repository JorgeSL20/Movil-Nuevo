class MarcaService {
    constructor() {
      this.url = 'https://proyectogatewayback-production.up.railway.app/marca/';
    }
  
    // Obtener todas las marcas
    async obtenerMarca() {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error(`Error al obtener marcas: ${response.statusText}`);
        }
        const data = await response.json();
        return data;  // Devuelve las marcas como un array
      } catch (error) {
        console.error('Error al obtener marcas:', error);
        throw error;
      }
    }
  
    // Crear una nueva marca
    async crearMarca(newMarca) {
      try {
        const response = await fetch(this.url, {
          method: 'POST',
          body: newMarca // FormData
        });
        if (!response.ok) {
          throw new Error(`Error al crear marca: ${response.statusText}`);
        }
        const data = await response.json();
        return data;  // Devuelve la marca creada
      } catch (error) {
        console.error('Error al crear marca:', error);
        throw error;
      }
    }
  
    // Eliminar una marca
    async eliminarMarca(id) {
      try {
        const response = await fetch(`${this.url}${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`Error al eliminar marca: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error al eliminar marca:', error);
        throw error;
      }
    }
  
    // Actualizar una marca
    async actualizarMarca(id, marca) {
      try {
        const response = await fetch(`${this.url}${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(marca)
        });
        if (!response.ok) {
          throw new Error(`Error al actualizar marca: ${response.statusText}`);
        }
        const data = await response.json();
        return data;  // Devuelve la marca actualizada
      } catch (error) {
        console.error('Error al actualizar marca:', error);
        throw error;
      }
    }
  }
  
  // Ejemplo de uso:
  const marcaService = new MarcaService();
  
  // Para obtener marcas
  marcaService.obtenerMarca().then(marcas => {
    console.log('Marcas obtenidas:', marcas);
  }).catch(error => {
    console.error(error);
  });
  
  // Para crear una nueva marca
  const nuevaMarca = new FormData();
  nuevaMarca.append('nombre', 'Nueva Marca');
  marcaService.crearMarca(nuevaMarca).then(marca => {
    console.log('Marca creada:', marca);
  }).catch(error => {
    console.error(error);
  });
  
  // Para eliminar una marca
  marcaService.eliminarMarca(1).then(() => {
    console.log('Marca eliminada');
  }).catch(error => {
    console.error(error);
  });
  
  // Para actualizar una marca
  const marcaActualizada = { nombre: 'Marca Actualizada' };
  marcaService.actualizarMarca(1, marcaActualizada).then(marca => {
    console.log('Marca actualizada:', marca);
  }).catch(error => {
    console.error(error);
  });
  