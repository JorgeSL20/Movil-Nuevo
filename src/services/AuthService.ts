class AuthService {
    constructor(http) {
      this.http = http;
      this.apiUrl = 'https://proyectogatewayback-production.up.railway.app'; // Ajusta según tu URL de backend
    }
  
    getToken() {
      return localStorage.getItem('token');
    }
  
    getCurrentUserId() {
      const token = this.getToken();
      if (token) {
        return parseInt(token, 10); // Dado que el token es el ID del usuario
      }
      return null;
    }
  
    getCurrentUserEmail() {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        return Promise.resolve(parsedUser.email);
      }
      return Promise.resolve(null);
    }
  
    getCurrentUser() {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        return Promise.resolve(parsedUser);
      }
      return Promise.resolve(null);
    }
  
    setUser(user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  
    getCurrentUserRole() {
      return localStorage.getItem('userRole');  // Obtiene el rol del usuario desde localStorage
    }
  }
  