const url = 'http://localhost:8082/api/usuario'
const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaUsuarios = data.usuarios //Capturar el array devuelto por la api
        datos = 
        listaUsuarios.map(function(usuario) {//Recorrer el array
            respuesta += `<tr><td>${usuario.direccion}</td>`+
            `<td>${usuario.latitud}</td>`+
            `<td>${usuario.longitud}</td>`+
            `<td>${usuario.descripcion}</td>`+
            `<td>${usuario.fecha}</td>`+
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(usuario)})' >Editar</a> 
            <a class="waves-effect waves-light btn modal-danger red"  onclick='eliminar(${JSON.stringify(usuario)})'>Eliminar</a></td>`+
            `</tr>`
            body.innerHTML = respuesta
        })
    })

}


const registrar = async () => {
    let _direccion = document.getElementById('direccion').value;
    let _latitud = document.getElementById('latitud').value;
    let _longitud = document.getElementById('longitud').value;
    let _descripcion = document.getElementById('descripcion').value;
  
      let usuario = {
        direccion: _direccion,
        latitud: _latitud,
        longitud: _longitud,
        descripcion: _descripcion
      };

      console.log(usuario)
  
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(usuario), //Convertir el objeto usuario a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a JSON
        .then(json => {
          console.log(json);
          if (json.msg) {
            Swal.fire(
              json.msg,
              '',
              'success'
            );
          }
        });
    } 
      

const editar= (usuario)=>{
    document.getElementById('direccion').value = ''
    document.getElementById('latitud').value = ''
    document.getElementById('longitud').value = ''
    document.getElementById('descripcion').value = ''

    document.getElementById('direccion').value = usuario.direccion
    document.getElementById('latitud').value = usuario.latitud
    document.getElementById('longitud').value = usuario.longitud
    document.getElementById('descripcion').value = usuario.descripcion
}


const eliminar= (id)=>{
    if(confirm('¿Está seguro que desea realizar la eliminación ')== true){
    
        let usuario = {
            _id : id        }

        fetch(url,  {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }
}

const actualizar = async()=>{
    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value
    if(_direccion.trim() !== '' && _latitud.trim() !== '' && _longitud.trim() !== '' && _descripcion.trim() !== ''){
        let usuario = {
            direccion:_direccion,
            latitud:_latitud,
            longitud:_longitud,
            descripcion:_descripcion
        }

        fetch(url,  {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }
    else{
        alert('Los campos están vacíos.')
    }
    
}


if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
.addEventListener('click',actualizar)
}


if(document.querySelector('#btnAEliminar')){
    document.querySelector('#btnAEliminar')
.addEventListener('click',eliminar)
}
