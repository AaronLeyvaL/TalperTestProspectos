
var prospectos = '';
BuscarProspecto();
async function BuscarProspecto()
{
    prospectos = await fetch('http://localhost:2024/Consultar').then(x => x.json()).then( resp => {
        if(resp.Respuesta == undefined)
        {
            Status = 204;
            alert("No hay informacion para mostrar")
        }
        return resp.Respuesta;
    })

    if(prospectos != undefined){
        CrearLista();
    }
    else{
        alert('No hay prospectos por evaluar');
    }
}

function CrearLista()
{
    // if(Status != 204){
        
        var ul = document.createElement('ul');
        var ulRechazados = document.createElement('ul');
        var ulAceptados = document.createElement('ul');

        document.body.children.namedItem('BodyListaSinRevisar').appendChild(ul);
        document.body.children.namedItem('BodyListaRechazados').appendChild(ulRechazados);
        document.body.children.namedItem('BodyListaAceptados').appendChild(ulAceptados);


        //document.body.children('BodyLista').appendChild(ul)
        //document.body.appendChild(ul);

        prospectos.forEach(element => {
            var li = document.createElement('li');
            li.id = element.id_prospecto;
            li.textContent = element.NombreProspecto +" "+ element.PrimerApellido +" "+ element.SegundoApellido +" ("+ element.estatus+")";

            if(element.estatus == "Enviado")
            {          
                li.className = "btn btn-warning cursor-pointer col-sm-10";     
                ul.className = "form-control";
                ul.appendChild(li);
            }
            else if(element.estatus == "Rechazado")
            {
                li.className = "btn btn-danger cursor-pointer col-sm-10";   
                ulRechazados.appendChild(li);
            }
            else if(element.estatus == "Autorizado")
            {
                li.className = "btn btn-success cursor-pointer col-sm-10";   
                ulAceptados.appendChild(li);
            }
        });

}



document.addEventListener('click', (e) =>{
    e.stopPropagation();
    let IdSelect = e.target.id; 
    if(IdSelect == "btnSalir"){
        window.location.href = './index.html';
    }
    else if (IdSelect)
    {
        if(e.target.parentElement.parentElement.id == "BodyListaSinRevisar")
        {
            localStorage.setItem('IdProspecto', IdSelect);
            window.location.href = './Evaluacion-prospecto.html'
        }
        else
        {
            alert("Estos elementos ya fueron revisados");
        }
        
    }
})

       

