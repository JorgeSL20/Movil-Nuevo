class SubcategoriaService {
    constructor() {
      this.url = 'https://proyectogatewayback-production.up.railway.app/subcategoria/';
    }
  
    // Obtener todas las subcategorías
    async obtenerSubcategoria() {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error(`Error al obtener subcategorías: ${response.statusText}`);
        }
        const data = await response.json();
        return data;  // Devuelve las subcategorías como un array
      } catch (error) {
        console.error('Error al obtener subcategorías:', error);
        throw error;
      }
    }
  
    // Crear una nueva subcategoría
    async crearSubcategoria(newSubcategoria) {
      try {
        // Verificar unicidad de la subcategoría antes de crearla
        const isUnique = await this.verificarSubcategoriaUnica(newSubcategoria.subcategoria);
        if (!isUnique) {
          throw new Error('La subcategoría ya existe');
        }
  
        const response = await fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newSubcategoria)
        });
  
        if (!response.ok) {
          throw new Error(`Error al crear subcategoría: ${response.statusText}`);
        }
  
        const data = await response.json();
        return data;  // Devuelve la subcategoría creada
      } catch (error) {
        console.error('Error al crear subcategoría:', error);
        throw error;
      }
    }
  
    // Eliminar una subcategoría
    async eliminarSubcategoria(id) {
      try {
        const response = await fetch(`${this.url}${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`Error al eliminar subcategoría: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error al eliminar subcategoría:', error);
        throw error;
      }
    }
  
    // Actualizar una subcategoría
    async actualizarSubcategoria(id, subcategoria) {
      try {
        const response = await fetch(`${this.url}${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subcategoria)
        });
  
        if (!response.ok) {
          throw new Error(`Error al actualizar subcategoría: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error al actualizar subcategoría:', error);
        throw error;
      }
    }
  
    // Verificar si la subcategoría es única
    async verificarSubcategoriaUnica(subcategoria) {
      try {
        const response = await fetch(`${this.url}verificar/${subcategoria}`);
        if (!response.ok) {
          throw new Error(`Error al verificar subcategoría: ${response.statusText}`);
        }
        const isUnique = await response.json();
        return isUnique;  // Devuelve un booleano indicando si la subcategoría es única
      } catch (error) {
        console.error('Error al verificar subcategoría:', error);
        throw error;
      }
    }
  }
  
  // Ejemplo de uso:
  const subcategoriaService = new SubcategoriaService();
  
  // Para obtener subcategorías
  subcategoriaService.obtenerSubcategoria().then(subcategorias => {
    console.log('Subcategorías obtenidas:', subcategorias);
  }).catch(error => {
    console.error(error);
  });
  
  // Para crear una nueva subcategoría
  const nuevaSubcategoria = { subcategoria: 'Nueva Subcategoría', descripcion: 'Descripción de la subcategoría' };
  subcategoriaService.crearSubcategoria(nuevaSubcategoria).then(subcategoria => {
    console.log('Subcategoría creada:', subcategoria);
  }).catch(error => {
    console.error(error);
  });
  
  // Para eliminar una subcategoría
  subcategoriaService.eliminarSubcategoria(1).then(() => {
    console.log('Subcategoría eliminada');
  }).catch(error => {
    console.error(error);
  });
  
  // Para actualizar una subcategoría
  const subcategoriaActualizada = { descripcion: 'Descripción actualizada' };
  subcategoriaService.actualizarSubcategoria(1, subcategoriaActualizada).then(() => {
    console.log('Subcategoría actualizada');
  }).catch(error => {
    console.error(error);
  });
  