const express = require('express');
const cors = require('cors')
var mysql = require('mysql2')
const multer = require('multer')
const app = express();
const port = 2024;
const bodyParser = require('body-parser');
const fs = require('fs');

const upload = multer({dest: './DocumentosProspectos/'});

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))






app.use(cors());

//#region variables de guardado de documento
var id_prospecto = 0;
var updateRutasDocumento = ``;;
//#endregion 

//#region SubirArchivos
app.post('/SubirDocumentos',express.json(), upload.array('Documentos', 10), (req, res) => {
    console.log("POST:/SUBIRARCHIVOS::");
    updateRutasDocumento = ``;
    id_prospecto = req.body.id_prospecto;
    req.files.map(CambiarNombreArchivo);

   

    connection.query(`UPDATE prospectosnuevos set documentos ='${updateRutasDocumento}' where id_prospecto = ${id_prospecto}`,
    function(error, result){
        if(error)
        {
            throw error;
        }
        else
        {
            console.log('Se actualizó correctamente');
        }
    }
)
    res.send('Documento guardado');
})
function CambiarNombreArchivo(file){

    let ruta = __dirname;
    ruta = ruta.toLowerCase();

    ruta = ruta.replace('\\','\\\\')    
    ruta = ruta.replace('\\t','\\\\t') 
    ruta = ruta.replace('\\b','\\\\b') 
    const nuevaRuta = `${ruta}\\\\DocumentosProspectos\\\\${id_prospecto}_${file.originalname}`;
    updateRutasDocumento = updateRutasDocumento + nuevaRuta + `,`;
    fs.renameSync(file.path, nuevaRuta);
    return nuevaRuta;

}

//#endregion

//#region ConsultarProspectos
app.get('/Consultar',express.json( {type: "*/*" }), (require, response) => {
    console.log("GET:/CONSULTARPROSPECTOS::");
    connection.query("SELECT id_prospecto, NombreProspecto, PrimerApellido, SegundoApellido, estatus FROM prospectosnuevos",
    function(error,result, fields){

       if(error)
       {
           throw error;
       }
       let resultado = {'Respuesta': []};
       icount = 0;
       result.forEach(element => {
           resultado.Respuesta[icount] = element;
           icount++;
       });
       response.send(JSON.stringify(resultado))
       
   })
})
//#endregion

//#region ConsultarPorProspecto
app.post('/Consultarporusuario', express.json( {type: "*/*" }), (require, response) => {
    console.log("POST:/CONSULTAUSUARIO::");
    connection.query("SELECT * FROM prospectosnuevos where id_prospecto = " + require.body.id_prospecto,
    function(error,result, fields){

       if(error)
       {
           throw error;
       }
       let resultado = {'Respuesta': []};
       icount = 0;
       result.forEach(element => {
           resultado.Respuesta[icount] = element;
           icount++;
       });
       response.send(JSON.stringify(resultado))
       
   })
})

//#endregion


//#region ActualizarProspecto
app.post('/ActualizarProspecto',express.json( {type: "*/*" }), (require, response) =>{
    console.log("POST:/ACTUALIZARPROSPECTO::");
    connection.query("UPDATE prospectosnuevos set estatus = '"+ require.body.estatus +"', comentarios = '"+ require.body.comentarios + "' where id_prospecto ="+ require.body.id_prospecto, 
    function(error,result, fields){

        if(error)
        {
            throw error;
        }
        else{
            console.log("Informacion Guardada con exito");
        }
    })
    
    response.status(201);
    response.resp = "Informacion guardada en la base de datos";
    response.send();
})

//#endregion

//#region GuardarProspecto
app.post('/Guardar',express.json( {type: "*/*" }), (require, response) => {
    console.log("POST:/GUARDARDATOS::"+ require.body.Apellidos);
    
    let Nombre = require.body.Nombre;
    let PrimerApellido = require.body.Apellidos;
    let SegundoApellido = require.body.Apellido2;
    let calle = require.body.Calle;
    let numero = require.body.Numero;
    let colonia = require.body.Colonia;
    let CP = require.body.CP;
    let Telefono = require.body.Telefono;
    let RFC = require.body.RFC;
    let Archivos = require.body.Archivos;
    let status = 'Enviado';

    connection.query("INSERT INTO prospectosnuevos(NombreProspecto, primerapellido, segundoapellido, calle, numero, colonia, codigopostal, telefono, rfc, documentos, estatus) VALUES('"+
        Nombre+"', '" +PrimerApellido+"','"+SegundoApellido+"', '"+ calle+
        "', "+numero+", '"+ colonia+"', '" +CP+"', '"+Telefono+"', '"+RFC+"', '"+Archivos+"', '"+ status+"')",
         function(error,result, fields)
         {
            let resultado = {'Respuesta': []};

            if(error)
            {
                throw error;
            }
            else
            {
                connection.query("Select id_prospecto from prospectosnuevos order by id_prospecto desc limit 1", 
                function(error,result, fields)
                {

                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        resultado.Respuesta[0] = result;
                        
                        response.status(201);
                        response.send(JSON.stringify(resultado)); 
                       
                    }
                })
            }
        })   
})

//#endregion


//#region ConexionesAServidor
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'prospectos',
    user:'root',
    password: '1234'
})

connection.connect(function(error){
    if(error){
        throw error;
    }
    else{
        console.log("Conectado al servidor DB");
    }
})

//#endregion

//#region IniciaServicio
app.listen(port, () => {
    console.log(`Aplicacion Corriendo en http://localhost:${port}`);
})

//#endregion



