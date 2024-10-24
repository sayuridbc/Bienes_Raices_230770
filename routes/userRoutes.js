import express, { request, response } from 'express';

const router = express.Router();


//Endeponds son las rutas para acceder a las secciones o funciones de nuestra
//aplicacion web
// ":" estos dos puntitos seignifican que definen de mannera posisvional los parametros de entrada
router.get("/findByID/:id",function(request,response){
    response.send(`Se esta solicitando buscar al usuariocon ID ${request.params.id}`);
})





//2 componentes de una peticion ruta , funcction calback
//POST

router.post("/newUser/:name/:email/:password",function(request,response){
    response.send(`Se ah solicitado la creacion de un nuevo usuario de nombre:
        ${request.params.name},asociando al correoelectronico:
        ${request.params.email} con la contraseña: ${request.params.password}`);
        })
//PUT
router.put("/replaceUserByEmail/:name/:email/:password",function(a,b){
    b.send(`Se ah solicitado el remplazo de toda la informacion del usuario:
        ${a.params.name},con correo:
        ${a.params.email},y contraseña:
        ${a.params.password}`);
})
//puede el navegador a cualquier peticion por medio de la URL solo peticiones GET OSEA es falso
//pero otras aplicaciones como thunder para otros metodos como put patch etc


//PATCH - se actualiza para la actualizacion


router.patch("/updatePassword/:email/:newPassword/:newPasswordConfirm",function(request,response){

    const {email,newPassword,newPasswordConfirm}=request.params //desestructuracion de objetos

    if(newPassword===newPasswordConfirm)
    {
    response.send(`Se ah solicitado la actualización de la contraseña del usurio con correo:
        ${email},se aceptan los cambios ya que la contraseña y confirmacion son la misma.`)
    }else{
response.send(`Se ah solicitado la actualizacion de la xontraseña del usuario de correo:
    ${email}con la nueva contraseña: ${newPassword},pero se rechaza el cambio dadoque la primera contraseña
    y su confirmación no coinciden `);
    console.log(newPassword);
    console.log(newPasswordConfirm);
}}

)
//DELETE

router.delete("/deleteUser/:email",function(request,response){
    response.send(`Se esta intentando la eliminacion del usuario asociado al correo ${request.params.email}`);
})

export default router;