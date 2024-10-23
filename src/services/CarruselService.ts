class CarruselService {
    private baseUrl: string;
  
    constructor() {
      this.baseUrl = 'https://proyectogatewayback-production.up.railway.app/carrusel';
    }
  
    // Método para subir una imagen
    async uploadImage(formData: FormData): Promise<any> {
      try {
        const response = await fetch(`${this.baseUrl}/upload`, {
          method: 'POST',
          body: formData
        });
        return await response.json();
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    }
  
    // Método para crear un nuevo carrusel
    async createCarrusel(newCarrusel: any): Promise<any> {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCarrusel)
        });
        return await response.json();
      } catch (error) {
        console.error('Error creating carrusel:', error);
        throw error;
      }
    }
  
    // Método para obtener todos los carruseles
    async findAllCarruseles(): Promise<any[]> {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'GET'
        });
        return await response.json();
      } catch (error) {
        console.error('Error fetching carruseles:', error);
        throw error;
      }
    }
  
    // Método para eliminar un carrusel por ID
    async removeCarrusel(id: number): Promise<{ message: string }> {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'DELETE'
        });
        return await response.json();
      } catch (error) {
        console.error('Error removing carrusel:', error);
        throw error;
      }
    }
  }
  
  // Ejemplo de uso del servicio
  const carruselService = new CarruselService();
  
  // Ejemplos de uso comentados
  // Subir imagen
  // const formData = new FormData();
  // formData.append('image', fileInput.files[0]);
  // carruselService.uploadImage(formData).then(data => console.log(data));
  
  // Crear un nuevo carrusel
  // const newCarrusel = { title: 'Nuevo Carrusel', description: 'Descripción del carrusel' };
  // carruselService.createCarrusel(newCarrusel).then(data => console.log(data));
  
  // Obtener todos
  