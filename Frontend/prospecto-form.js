
document.getElementById("id_prospecto").style.display = "none";


async function GuardarDatos(){
    let snombre = document.getElementById("nombre").value;
    let sapellido = document.getElementById("apellido").value;
    let sapellido2 = document.getElementById("SegundoApellido").value;
    let scalle = document.getElementById("calle").value;
    let snumero = document.getElementById("numero").value;
    let scolonia = document.getElementById("colonia").value;
    let scp = document.getElementById("cp").value;
    let stelefono = document.getElementById("telefono").value;
    let srfc = document.getElementById("rfc").value;
    let sarchivos = document.getElementById("formFileMultiple").value;

    

    if(snombre != '' && sapellido != '' &&  scalle!= '' &&  snumero != undefined && scolonia!= '' && scp != undefined && stelefono!= '' && srfc!= '' && sarchivos != '')
    {    
        let guardar = {
            Nombre: snombre, Apellidos: sapellido, Apellido2: sapellido2, Calle: scalle, Numero: snumero, Colonia: scolonia, CP: scp,
            Telefono: stelefono, RFC: srfc, Archivos: sarchivos
        }
        let GuardarJson = JSON.stringify(guardar);
        let id_prospecto = await fetch('http://localhost:2024/Guardar', {
            method: 'Post',
            body: GuardarJson
        }).then(x => x.json()).then( resp => {
            if(resp.Respuesta == undefined)
            {
                Status = 204;
                alert("No hay informacion para mostrar")
            }
            return resp.Respuesta
        });
        if (id_prospecto[0][0].id_prospecto)
        {
            document.getElementById("id_prospecto").value = id_prospecto[0][0].id_prospecto;
            var datosFormulario = new FormData(document.getElementById('guardarformulario'));   
            datosFormulario.append('id_prospecto', id_prospecto[0][0].id_prospecto);
        
            fetch('http://localhost:2024/SubirDocumentos', {
                method: 'Post',
                body: datosFormulario
                }).then(() =>{
                    window.location.href = './prospecto-list.html';
            })
        }
       
        
                
            
        
    }
    else{
        alert("Favor de rellenar los campos obligatorios");
    }
}

function btnSalir()
    {
    var mensaje;
    var opcion = confirm("Al salir, perderá los datos capturados . Seguro que quiere salir?");
    if (opcion == true) {
        window.location.href = './index.html';
	} 
	document.getElementById("ejemplo").innerHTML = mensaje;
}

