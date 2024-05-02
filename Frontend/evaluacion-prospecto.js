var prospectos = '';

BuscarCliente();
async function BuscarCliente(){
    let IdProspecto = localStorage.getItem('IdProspecto');
    if(IdProspecto != undefined){
        await BuscarDetallesProspecto(IdProspecto)
        await LlenarDatos();
    }
}
async function BuscarDetallesProspecto(Id)
{
    let Dato = {id_prospecto: Id}
    let DatoJSON = JSON.stringify(Dato);

    prospectos = await fetch('http://localhost:2024/Consultarporusuario', {
        method: 'Post',
        body: DatoJSON
    }).then(x => x.json()).then( resp => {
        if(resp.Respuesta == undefined)
        {
            resp.Respuesta = "No hay informacion para mostrar";
        }
        
        return resp.Respuesta
    })
    
}

async function LlenarDatos(){
    document.getElementById("nombre").value = prospectos[0].NombreProspecto;
    document.getElementById("apellido").value = prospectos[0].PrimerApellido + ' ' + prospectos[0].SegundoApellido;
    document.getElementById("calle").value = prospectos[0].calle;
    document.getElementById("numero").value = prospectos[0].numero;
    document.getElementById("colonia").value = prospectos[0].colonia;
    document.getElementById("cp").value = prospectos[0].CodigoPostal;
    document.getElementById("telefono").value = prospectos[0].Telefono;
    document.getElementById("rfc").value = prospectos[0].RFC;

    var ul = document.createElement('ul');
    document.getElementById('documentos').appendChild(ul);
    let DocumentsArray = [];
    let rutaArray = [];

    DocumentsArray = prospectos[0].documentos.split(',')
    
    DocumentsArray.forEach(element => {
        

        rutaArray = element.split('\\');
        let nombreDocument = rutaArray[rutaArray.length - 1];
        if(nombreDocument !="")
        {
            var li = document.createElement('li');
            var a = document.createElement('a');
            li.id = nombreDocument;
            a.href = element;
            a.target = "_blank";
            li.textContent = '';
            a.textContent = nombreDocument;
            li.appendChild(a);
            ul.appendChild(li);
        }
      })
     


    if(prospectos[0].estatus != "Enviado"){
        document.getElementById("estatus").disabled = true;
        document.getElementById("comentarios").readOnly = true;
    }
    document.getElementById("estatus").value = prospectos[0].estatus;
    document.getElementById("comentarios").value = prospectos[0].comentarios;
}

document.addEventListener('click', (e => {
    e.stopPropagation();
    let IdSelect = e.target.id; 
    if(IdSelect == "estatus"){
         var comentarios = document.getElementById('comentarios');
         if(e.target.value == "Autorizar" || e.target.value == "Enviado")
         {
            comentarios.readOnly = true;
            comentarios.value = "";
         }
         else
         {
            comentarios.readOnly = false;
         }
    }
    else if (IdSelect == "btnSalir"){
        window.location.href = './Lista-Evaluacion.html'
    }    
}))

function ActualizarProspecto(){
    if(document.getElementById("estatus").value != "Enviado")
    {
        let status = (document.getElementById("estatus").value == 'Autorizar')? "Autorizado":"Rechazado";

        if(status == "Rechazado" && document.getElementById("comentarios").value == ""){
            alert("Agregar el motivo del rechazo");
        }
        else
        {
            let ActualizarProspecto = {
                id_prospecto: localStorage.getItem('IdProspecto'), 
                estatus: status,
                comentarios: document.getElementById("comentarios").value
            }
            let ActualizarJson = JSON.stringify(ActualizarProspecto);
            fetch('http://localhost:2024/ActualizarProspecto', {
                method: 'Post',
                body: ActualizarJson
            })
            .then(x => {
                
        
                if(x.status == 201){
                    alert('Se ha actualizado los datos del prospecto');
                    window.location.href = 'Lista-Evaluacion.html';
                }
            })
        }
        
    }
    
}