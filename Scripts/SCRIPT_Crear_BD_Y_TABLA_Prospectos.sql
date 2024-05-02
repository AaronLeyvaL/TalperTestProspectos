DROP database IF EXISTS prospectos;

create database prospectos;
use prospectos;

create table prospectosnuevos(
id_prospecto int  primary key AUTO_INCREMENT,
NombreProspecto varchar(30) not null,
PrimerApellido varchar(30) not null,
SegundoApellido varchar(30),
calle varchar(30) not null,
numero int not null,
colonia varchar(30) not null,
CodigoPostal int not null,
Telefono varchar(13) not null,
RFC varchar(20) not null,
documentos varchar(1000) not null,
estatus varchar(15) not null,
comentarios varchar(500)
);