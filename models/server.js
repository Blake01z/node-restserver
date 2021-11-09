const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a la DB
        this.conectarDB();
        //Middleweres
        this.middleweres();
        //rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
       await dbConnection();
    }

    middleweres(){
        //cors
        this.app.use(cors());

        //Parse y lectura del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'))
    }


    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en:${this.port}`)
          })
    }

}




module.exports = Server;