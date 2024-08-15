// Utilities
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('UserSt', {
  state: () => ({
    UsersList:[],
  }),
  actions:{
    async LeerUsuarios(){
      try{
       let response=await this.$axios.get(`/api/User`);
       this.UsersList=response.data;
      }catch(err){
        throw err;
      }
    },
    async LeerUsuario(ide){
      try{
        let response=await this.$axios.get(`/api/User/${ide}`);
        return response.data;
       }catch(err){
         throw err;
       }
    },
    async CrearUsuario(item){
      try{
        let response=await this.$axios.post(`/api/User`,item);
        await this.LeerUsuarios()
        return;
      }catch(err){
        throw err;
      }
    },
    async ActualizarUsuario(ide,item){
      try{
       let response=await this.$axios.put(`/api/User/${ide}`,item)
       await this.LeerUsuarios()
        return;
      }catch(err){
        throw err;
      }
    },
    async EliminarUsuario(ide){
      try{
        let response=await this.$axios.delete(`/api/User/${ide}`)
        await this.LeerUsuarios()
        return;
       }catch(err){
         throw err;
       }
    },
    async SubirArchivoUsuario(ide,file){
      try{
        console.log(file)
        let formData = new FormData();
        formData.append('file', file);

       let response=await this.$axios.post(`/api/BigFile/User/${ide}`,formData)
      }catch(err){
        throw err;
      }
    },
    async DescargarArchivo(ide){
      try{
       let response=await this.$axios.get(`/api/BigFile/User/${ide}`,
        {
          responseType: 'blob' // Especifica que la respuesta será un archivo blob
        })

      // Crear un objeto Blob con los bytes decodificados
     // Crear un Blob con los datos de la respuesta y el tipo de archivo
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Obtener el nombre del archivo desde el encabezado 'content-disposition'
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'archivo_descargado.pdf'; // Nombre por defecto

      if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
          if (fileNameMatch.length > 1) {
              fileName = fileNameMatch[1];
          }
      }

      // Crear una URL para el Blob y un enlace para descargar el archivo
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // Nombre del archivo a descargar
      document.body.appendChild(link);
      link.click();

      // Limpiar la URL del Blob después de la descarga
      window.URL.revokeObjectURL(url);

      }catch(err){
        throw err;
      }
    }
  }
})
