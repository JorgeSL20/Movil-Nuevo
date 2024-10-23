class PagoService {
    constructor(http, authService) {
      this.http = http;
      this.authService = authService;
      this.apiUrl = 'https://proyectogatewayback-production.up.railway.app'; // Ajusta la URL según tu entorno
    }
  
    crearOrden(pagoData) {
      const token = this.authService.getToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      return this.http.post(`${this.apiUrl}/pago/crear-orden`, pagoData, { headers })
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  
    capturarPago(orderId) {
      const token = this.authService.getToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      return this.http.post(`${this.apiUrl}/pago/capturar-pago`, { orderId }, { headers })
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  
    enviarConfirmacion(items) {
      const token = this.authService.getToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      
      return new Promise((resolve, reject) => {
        this.authService.getCurrentUserEmail().then(email => {
          if (email) {
            this.http.post(`${this.apiUrl}/soporte/send-email`, { items, email }, { headers })
              .then(response => resolve(response.data))
              .catch(error => reject(error));
          } else {
            reject('No email found');
          }
        });
      });
    }
  }
  