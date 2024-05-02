

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
       

    document.getElementById("estatus").value = prospectos[0].estatus;
    if(prospectos[0].estatus == "Rechazado"){
        document.getElementById("comentarios").value = prospectos[0].comentarios;
        document.getElementById("comentarios").style.display = "block";
        document.getElementById("labelComentarios").style.display = "block";

    }
    else
    {
        document.getElementById("comentarios").style.display = "none";
        document.getElementById("labelComentarios").style.display = "none";
    }
}

document.addEventListener('click', (e => {
    e.stopPropagation();
    if(e.target.id == "btnSalir")
    {
        window.location.href = './prospecto-list.html'
    }
    
}))


