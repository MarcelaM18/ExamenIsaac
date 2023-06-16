//Migracion 
const {Schema, model}=require('mongoose')

const UsuarioSchema= Schema({
    //se define tipos de datos
    direccion:{
        unique:[true, 'El direccion:{VALUE} ya existe'],
        type: String,
        required: [true,'El campo direccion es requerido']

    },
    latitud:{
        type: Number,
        required:[true, 'la latitud es requerido'],
        max: 6.217,
        min: 6.13
    },

    longitud:{
        type:Number,
        required:[true, 'la longitud es requerido'],
        min: -75.567,
        max:-75.34

    },

    descripcion:{
        type: String,
        required:[true, 'El estado es obligatorio']
        
    },
    fecha:{
        type:Date,
        default : new Date
    }
})
//este es el nombre del objeto Usuario
module.exports = model('Usuario', UsuarioSchema)//Exportar el modelo

