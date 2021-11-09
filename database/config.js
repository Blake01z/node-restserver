const mongoose = require('mongoose');
require('colors');

const dbConnection = async() =>{
    try {
        
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });

        console.log('Base de Datos Online'.bgCyan);

    } catch (error) {
        console.log(error)
        throw new Error('La conexion no se establecio');
    }

}


module.exports = {
    dbConnection
}