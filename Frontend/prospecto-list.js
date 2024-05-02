    var Status = 200;
    var prospectos = '';

    ConsultarDatos();
    async function ConsultarDatos()
    {
        
        prospectos = await fetch('http://localhost:2024/Consultar').then(x => x.json()).then( resp => {
            if(resp.Respuesta == undefined)
            {
                Status = 204;
                alert("No hay informacion para mostrar")
            }
            return resp.Respuesta
        })
        CrearTabla();

    }

    function CrearTabla()
    {
        if(Status != 204){
            var tabla_body = document.getElementById("body_prospectos");

            tabla_body.innerHTML = '';

            prospectos.forEach(element => {
                var fila = tabla_body.insertRow(-1);
                fila.id = element.id_prospecto;
                fila.insertCell(0).innerHTML = element.NombreProspecto;
                fila.insertCell(1).innerHTML = element.PrimerApellido;
                fila.insertCell(2).innerHTML = element.SegundoApellido;
                fila.insertCell(3).innerHTML = element.estatus;
            });
        }
        else{
            alert("No hay informacion para mostrar");
        }
    }

const table = document.getElementById("table");

document.addEventListener('click', (e => {
    e.stopPropagation();
    
    let ID = e.target.parentElement.id;
    if(ID == "")
    {
        window.location.href = './index.html'
    }
    else
    {
        localStorage.setItem('IdProspecto', ID);
        window.location.href = './Datos-Prospectos.html'
    }
    
}))









