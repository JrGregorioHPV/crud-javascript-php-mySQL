var url = "data.php";
var modal = new bootstrap.Modal(document.getElementById('idModal'),{
    keyboard: false
});

var aplicacion = new function(){
    this.nombre = document.getElementById("nombre");
    this.email = document.getElementById("email");

    this.idEditar = document.getElementById("idEditar");
    this.nombreEditar = document.getElementById("nombreEditar");
    this.emailEditar = document.getElementById("emailEditar");

    this.empleados = document.getElementById("empleados");

    // Leer
    this.Leer = function(){
        var datos = "";
        fetch(url)
            .then(r => r.json())
            .then((respuesta)=>{
                console.log(respuesta);
                respuesta.map(
                    function(empleado, index, array){
                        datos += "<tr>";
                        datos += "<td>" + empleado.id + "</td>";
                        datos += "<td>" + empleado.nombre + "</td>";
                        datos += "<td>" + empleado.correo + "</td>";
                        datos += `<td>
                                    <div class="btn-group" role="group" aria-label="">
                                        <button type="button" class="btn btn-info" onclick="aplicacion.Editar(`+empleado.id+`)">Editar</button>
                                        <button type="button" class="btn btn-danger" onclick="aplicacion.Borrar(`+empleado.id+`)">Borrar</button>
                                    </div>
                                  </td>`;
                        datos += "</tr>";
                    }
                );
                return this.empleados.innerHTML = datos;

            }).catch(console.log);
        //datos = '<tr><td scope="row">1</td><td scope="row">Oscarr</td><td scope="row">juan@mail.com</td><td scope="row">pedro@mail.com</td></tr>';
        
    }
    // Agregar
    this.Agregar = function(){
        console.log(nombre.value);
        console.log(email.value);

        var datosEnviar = {
            nombre: this.nombre.value,
            correo: this.email.value
        }

        fetch(url+"?insertar=1",{
            method: "POST",
            body: JSON.stringify(datosEnviar)
        }).then(respuesta => respuesta.json())
          .then((datosRespuesta)=>{
            console.log("Insertado con exito.");
            this.Leer(); // Actualiza la tabla
        }).catch(console.log);
    };

    // Borrar
    this.Borrar = function(id){
        fetch(url+"?borrar="+id)
          .then(respuesta => respuesta.json())
          .then((datosRespuesta)=>{
            console.log("Registro borrado.");
            this.Leer(); // Actualiza la tabla
        }).catch(console.log);
    }

    // Editar
    this.Editar = function(id) {
        fetch(url+"?consultar="+id)
          .then(respuesta => respuesta.json())
          .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.idEditar.value = datosRespuesta[0]['id'];
            this.nombreEditar.value = datosRespuesta[0]['nombre'];
            this.emailEditar.value = datosRespuesta[0]['correo'];;
        }).catch(console.log);
        modal.show(); // Muestra modal
    }

    // Actualizar
    this.Actualizar = function() {
        var datosEnviar = {
            id: this.idEditar.value,
            nombre: this.nombreEditar.value,
            correo: this.emailEditar.value
        }

        fetch(url+"?actualizar=1",{
            method: "POST",
            body: JSON.stringify(datosEnviar)
        }).then(respuesta => respuesta.json())
          .then((datosRespuesta)=>{
            console.log("Datos actualizados.");
            this.Leer(); // Actualiza la tabla
            modal.hide(); // Oculta el modal
        }).catch(console.log);
    }
}

aplicacion.Leer();