//Ejemplo de activación de hot reload
//console.log ("Hola desde Node.js")


//const express=require('express');
// importar la libreria para crear un servidor web -Common JS/ECMA Script 6
//Instanciar nuestra aplicaccion web

import express from 'express';
import generalRoutes from './routes/generalRoutes.js'
import userRoutes from './routes/userRoutes.js'
const app = express()

//Configuramos  nuetro servidor web
const port = 3000;
app.listen(port ,()=>{
console.log (`la aplicacion ah iniciado en el puerto: ${port}`);
})

app.use('/',generalRoutes);
app.use('/usuario/',userRoutes);


