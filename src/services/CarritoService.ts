class CarritoService {
    constructor(authService, productoService) {
      this.apiUrl = 'https://proyectogatewayback-production.up.railway.app/carrito';
      this.authService = authService;
      this.productoService = productoService;
    }
  
    // Obtener encabezados con el token de autenticación
    getAuthHeaders() {
      const token = localStorage.getItem('token');
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    }
  
    // Agregar un ítem al carrito
    async agregarItem(productoId, cantidad) {
      try {
        const producto = await this.productoService.obtenerProductoPorId(productoId);
        const userId = this.authService.getCurrentUserId();
        if (userId !== null) {
          const response = await fetch(`${this.apiUrl}/agregar`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({
              productoId,
              cantidad,
              userId,
              productoNombre: producto.producto,
              productoPrecioMen: producto.precioMen,
              productoPrecioMay: producto.precioMay,
              productoCantidadMay: producto.cantidadMay,
              url: producto.url
            })
          });
          return await response.json();
        } else {
          console.warn('El usuario no está autenticado.');
          return null;
        }
      } catch (error) {
        console.error('Error al agregar el ítem:', error);
      }
    }
  
    // Obtener todos los ítems del carrito
    async obtenerItemsDelCarrito() {
      try {
        const userId = this.authService.getCurrentUserId();
        if (userId !== null) {
          const response = await fetch(`${this.apiUrl}/items/${userId}`, {
            method: 'GET',
            headers: this.getAuthHeaders()
          });
          const items = await response.json();
  
          if (!Array.isArray(items)) {
            console.error('Formato de datos incorrecto:', items);
            return [];
          }
  
          const productos = await this.productoService.obtenerProductos();
          if (!Array.isArray(productos)) {
            console.error('Formato de datos incorrecto:', productos);
            return [];
          }
  
          const itemsConDetalles = items.map(item => {
            const producto = productos.find(p => p.id === item.productoId);
            return {
              ...item,
              productoNombre: producto?.producto || 'Desconocido',
              productoImagen: producto?.url || 'default-image-url',
              productoPrecioMen: producto?.precioMen || 0,
              productoPrecioMay: producto?.precioMay || 0,
              productoCantidadMay: producto?.cantidadMay || 0
            };
          });
  
          return itemsConDetalles;
        } else {
          console.warn('El usuario no está autenticado.');
          return [];
        }
      } catch (error) {
        console.error('Error al obtener los ítems del carrito:', error);
      }
    }
  
    // Eliminar ítem del carrito
    async eliminarItem(itemId) {
      try {
        const response = await fetch(`${this.apiUrl}/eliminar/${itemId}`, {
          method: 'DELETE',
          headers: this.getAuthHeaders()
        });
        return await response.json();
      } catch (error) {
        console.error('Error al eliminar el ítem:', error);
      }
    }
  
    // Actualizar la cantidad de un ítem en el carrito
    async actualizarCantidad(itemId, nuevaCantidad) {
      try {
        const response = await fetch(`${this.apiUrl}/actualizar-cantidad/${itemId}`, {
          method: 'PUT',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ cantidad: nuevaCantidad })
        });
        return await response.json();
      } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
      }
    }
  
    // Vaciar el carrito
    async vaciarCarrito() {
      try {
        const userId = this.authService.getCurrentUserId();
        if (userId !== null) {
          const response = await fetch(`${this.apiUrl}/vaciar/${userId}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders()
          });
          return await response.json();
        } else {
          console.warn('El usuario no está autenticado.');
          return null;
        }
      } catch (error) {
        console.error('Error al vaciar el carrito:', error);
      }
    }
  
    // Procesar el pago
    async procesarPago() {
      try {
        const userId = this.authService.getCurrentUserId();
        if (userId !== null) {
          const response = await fetch(`${this.apiUrl}/procesar-pago/${userId}`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
          });
          return await response.json();
        } else {
          console.warn('El usuario no está autenticado.');
          return null;
        }
      } catch (error) {
        console.error('Error al procesar el pago:', error);
      }
    }
  
    // Agregar o actualizar ítem en el carrito
    async agregarOActualizarItem(item) {
      try {
        const response = await fetch(`${this.apiUrl}/agregar-o-actualizar`, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(item)
        });
        return await response.json();
      } catch (error) {
        console.error('Error al agregar o actualizar el ítem:', error);
      }
    }
  }
  