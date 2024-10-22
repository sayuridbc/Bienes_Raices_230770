//ejemplo de activacion
//console.log("Hola desde NodeJS, esto esta en hot reload")

import express from 'express';
//const express = require('express'); 
//importar la libreria para crear un servidor web
//instanciar nuestra aplicaion web
const app = express()

const port = 3000;
app.listen(port, ()=> {
    console.log(`La aplicaión ha iniciado en el puerto: ${port, 3000}`);
})

app.get("/", function(req, res){
res.send("hola desde la web, en NodeJS")
})

app.get("/quienEres", function(req, res){
    res.json(
    {
    "nombre": "Sayurid Bautista Cruz",
    "carrera":"TI DSM",
    "grado": "4",
    "grupo": "A"
    }
    )
    })

//