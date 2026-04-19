// archivo principal de la aplicacion

/** 
 * Paso 8 = Configuración del Servidor
   __________________________________________________________________
 
 * Centraliza la conexion a MongoDB y a las rutas necesarias

*/

import express from 'express'; 
import {connectDB} from './config/dbConfig.mjs';

// revisar esto ----------------------------------------
import superHeroRoutes from './routes/superHeroRoutes.mjs';  
// -----------------------------------------------------

const server = express(); 

// ???? -------------------------------------
/**
  process.env.PORT: variable de entorno
  || 3000`: valor por defecto (fallback)
 */
const PORT = process.env.PORT || 3000; 
// -------------------------------------------

// Middleware para parsear JSON
server.use(express.json()); 

// configuracion de rutas
/** 
  Se define el prefijo "/api". Por lo que todas las rutas
  llevaran este prefijo. por ejemplo: 
  - http://localhost:3000/api/heroes/:id
*/
server.use('/api', superHeroRoutes); 

// conexion a MongoDB
connectDB(); 

// Manejo de errores para rutas no encontradas
server.use((req, res) => {

    res.status(404).send({mensaje: `Ruta no encontrada`});
}); 

// iniciar el servidor
server.listen(PORT, () => {

    console.log(`Servidor escuchando en el puerto ${PORT}`); 
}); 

