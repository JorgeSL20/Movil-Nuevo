class ProductoService {
    constructor(http) {
      this.http = http;
      this.url = 'https://proyectogatewayback-production.up.railway.app/producto';
    }
  
    obtenerProductos(order = 'desc') {
      return this.http.get(`${this.url}?_sort=fecha&_order=${order}`)
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  
    obtenerProductoPorId(id) {
      return this.http.get(`${this.url}/${id}`)
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  
    crearProducto(newProducto) {
      return this.http.post(this.url, newProducto)
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  
    actualizarProducto(id, formData) {
      return this.http.put(`${this.url}/${id}`, formData)
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  
    eliminarProducto(id) {
      return this.http.delete(`${this.url}/${id}`)
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  }
  