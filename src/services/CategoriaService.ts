class CategoriaService {
    constructor() {
      this.url = 'https://proyectogatewayback-production.up.railway.app/categoria/';
    }
  
    // Obtener todas las categorías
    async obtenerCategoria() {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error(`Error al obtener categorías: ${response.statusText}`);
        }
        const data = await response.json();
        return data;  // Devuelve las categorías como un array
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
      }
    }
  
    // Crear una nueva categoría
    async crearCategoria(newCategoria) {
      try {
        const response = await fetch(this.url, {
          method: 'POST',
          body: newCategoria // FormData
        });
        if (!response.ok) {
          throw new Error(`Error al crear categoría: ${response.statusText}`);
        }
        const data = await response.json();
        return data;  // Devuelve la categoría creada
      } catch (error) {
        console.error('Error al crear categoría:', error);
        throw error;
      }
    }
  
    // Eliminar una categoría
    async eliminarCategoria(id) {
      try {
        const response = await fetch(`${this.url}${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`Error al eliminar categoría: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
        throw error;
      }
    }
  
    // Actualizar una categoría
    async actualizarCategoria(id, updatedCategoria) {
      try {
        const response = await fetch(`${this.url}${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedCategoria)
        });
        if (!response.ok) {
          throw new Error(`Error al actualizar categoría: ${response.statusText}`);
        }
        const data = await response.json();
        return data;  // Devuelve la categoría actualizada
      } catch (error) {
        console.error('Error al actualizar categoría:', error);
        throw error;
      }
    }
  }
  
  // Ejemplo de uso:
  const categoriaService = new CategoriaService();
  
  // Para obtener categorías
  categoriaService.obtenerCategoria().then(categorias => {
    console.log('Categorías obtenidas:', categorias);
  }).catch(error => {
    console.error(error);
  });
  
  // Para crear una nueva categoría
  const nuevaCategoria = new FormData();
  nuevaCategoria.append('nombre', 'Nueva Categoría');
  categoriaService.crearCategoria(nuevaCategoria).then(categoria => {
    console.log('Categoría creada:', categoria);
  }).catch(error => {
    console.error(error);
  });
  
  // Para eliminar una categoría
  categoriaService.eliminarCategoria(1).then(() => {
    console.log('Categoría eliminada');
  }).catch(error => {
    console.error(error);
  });
  
  // Para actualizar una categoría
  const categoriaActualizada = { nombre: 'Categoría Actualizada' };
  categoriaService.actualizarCategoria(1, categoriaActualizada).then(categoria => {
    console.log('Categoría actualizada:', categoria);
  }).catch(error => {
    console.error(error);
  });
  