//Importar paquetes requeridos de node
const {response}= require('express')


//Importacion de los modelos 
const Usuario=require('../models/usuario')


//insercion, modificacion de datos

//consultar
const usuarioGet = async(req, res = response)=>{
    const{direccion}= req.query // desestructuracion obtiene lo que se manda del navegador
    

    //Buscar todos los usuarios colsultar los uasuarios
    const usuarios = await Usuario.find()
    res.json({
        usuarios
    })
}


const usuarioPost = async(req,res = response) => {
    const body = req.body//Captura de atributos
    let mensaje=''
    console.log(body)

    try{
        const usuario= new Usuario(body)

        //guardar objeto
        await usuario.save()
        mensaje='La inserción se realizó exitosamente'

    } catch (error) {
    if (error) {
            if (error.name === 'ValidationError') {
                console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            } 
        }
   console.log(mensaje)
    
    }

    res.json({
        msg: mensaje
    })

}


const usuarioPut= async(req, res= response)=>{
    //captura atributos o parametros
    const{direccion, latitud, longitud, descripcion}=req.body
    let mensaje=''
    //realizar la modificacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const usuario= await Usuario.findOneAndUpdate({direccion:direccion}, {latitud:latitud, longitud:longitud, descripcion:descripcion})
        mensaje='La modificación se efectuó correctamente.'

    }
    catch(error){
        mensaje='Se presentaron problemas en la modificación'

    }

   

    res.json({
        msg: mensaje 
    })

}

const usuarioDelete= async(req, res= response)=>{
    //captura atributos o parametros
    const{_id}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
   try{
    const usuario= await Usuario.deleteOne({_id:_id})
    mensaje='La eliminacion se efectuo correctamente.'

}
catch(error){
    mensaje='Se presentaron problemas en  la eliminacion.'

}



res.json({
    msg: mensaje 
})

}


module.exports={
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}