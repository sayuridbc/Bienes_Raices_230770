import { check ,validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import {generarId} from '../Helpers/tokens.js'
import {emailRegistro} from '../Helpers/emails.js'
import { where } from 'sequelize'
import { request, response } from 'express'
const formularioLogin = (req,res) => {
    res.render('auth/login',{
         pagina : 'IniciarSesión'
    })
}
const formularioRegistro = (req,res) => {

    res.render('auth/registro',{
        pagina : 'Crear Cuenta',
        csrfToken : req.csrfToken()
    })
}
const registrar = async (req,res) => {
    
        //Validacion 
        await check('nombre').notEmpty().withMessage('El Nombre no puede ir vacio').run(req)
        await check('email').isEmail().withMessage('Eso no parece un email').run(req)
        await check('password').isLength({min:8}).withMessage('La contraseña debe de ser minimo 8 caracteres').run(req)
        await check('repeat_password').custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden').run(req)

        
        let resultado = validationResult(req)
    
        //Verificar que el resulatado este vacio
        if(!resultado.isEmpty()){
            //Errores
            return res.render('auth/registro',{
                pagina : 'Crear Cuenta',
                csrfToken : req.csrfToken(),
                errores: resultado.array(),
                usuario: {
                    nombre : req.body.nombre,
                    email : req.body.email
                }               
            })

        }
        //Extraer los datos
        const {nombre,email,password} = req.body

        //Verificar que el usuario no este duplicado
         const existeUsuario = await Usuario.findOne({where : {email}})
        console.log('Usuario Existente')
        if(existeUsuario){            
            return res.render('auth/registro',{
                pagina : 'Crear Cuenta',
                csrfToken : req.csrfToken(),
                errores: [{msg : 'El usuario ya esta registrado'}],
                usuario: {
                    nombre : req.body.nombre,
                    email : req.body.email
                }               
            })

        }
        //Almacenar un usuario
       const  usuario = await Usuario.create({
            nombre,
            email,
            password,
            token : generarId()
        })
        
        // Enviar email de confirmacion 
        emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })

        //Mensaje de confirmacion
        res.render('templates/mensaje',{
            pagina : 'Cuenta Creada Correctamente',
            mensaje : 'Se envio un correo de confirmacion a tu correo , da clic en el enlace para confirmar'
        })            
}
        //Formulario que comprueba una cuenta
        const confirmar = async (req,res) =>{
            const {token} = req.params;

        //Verificar si el token es valido
       const usuario = await Usuario.findOne({ where : {token}})

       if(!usuario){
            return res.render('auth/confirmar',{
                pagina:'Error al confirmar cuenta',
                mensaje:'Ups... Al parecer hubo un error al confirmar tu cuenta intentalo de nuevo',
                error: true
            })
       }

        //Confirmar la cuenta
        usuario.token = null ;
        usuario.confirmado = true ;
        await usuario.save();
        return res.render('auth/confirmar',{
            pagina:'Cuenta Confirmada',
            mensaje:'Cuenta Confirmada Correctamente'           
        })
        }

const formularioPassword = (req,res) => {
    res.render('auth/password',{
        pagina : 'Recupera Tu Contraseña'
    })

    const passwordReset = async(request, response) =>{

        console.log("Validando los datos para la recuperación de la contraseña")
        //validacion de los campos que se reciben del formulario 
        //validacion FrontEnd 
        await check('correo_usuario').notEmpty().withMessage("El correo electronico es un campo obligatorio.").isEmail().withMessage
        ("El correo electronico no tiene el formato de: usuario@dominio.extension").run
        (request)
        let result = validationResult(request)

        //verificamos si hay errores de validacion
        if(!result.isEmpty())
        {
            return response.render("auth/passwordRecovery", {
                page: 'Error al intentar resetear la contraseña',
                errors: result.array(),
                csrfToken: request.csrfToken()
            })
        }
        const{correo_usuario:email} = request.body
    

const existingUser = await User.findOne({ where: { email, confirmed:1}})

if(existingUser)
{
    return response.render("auth/passwordRecovery",{
        page: 'Error, no existe una cuenta asociada al correo electronico ingresado',
        csrfToken: request.csrfToken(),
        errors: [{msg: `Por favor revisa los datos e intentalo de nuevo`}],
        user: {
            email: email
        }
    })
}

const verfyTokenPasswordChange=async (request,response) =>{
    const {token} = request.params;
    const userTokenOwner = await User.findOne({where :{token}})

    if(!userTokenOwner)
    {
        response.render('templates/message',{
            csrfToken: request.csrfToken(),
            page: 'error',
            msg: 'El token ha expirado o no existe'
    })
    }
    return 0;
}
const updatePassword = async(request, response)=>{
    return 0;
}

//Registramos los datos en la base de datos 
existingUser.password=null;
token= generarId();
existingUser.save();

emailAfterReister({
    name: newUser.name,
    email: newUser.email,
    token: newUser.token
})

//Enviar el correo de confirmacion 
emailChangePassword({
    name: existingUser.name,
    email: existingUser.email,
    token: existingUser.token
})
    }
}
export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioPassword
}
