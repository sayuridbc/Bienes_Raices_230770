import express from "express";
import { formularioLogin,formularioRegistro,registrar,confirmar,formularioPassword,verifyTokenPasswordChange,updatePassword } from "../Controllers/usuarioController.js";

const router = express.Router();

router.get('/login',formularioLogin)
router.get('/registro',formularioRegistro)
router.post('/registro',registrar)
router.get('/confirmar/:token',confirmar)
router.get('/password',formularioPassword)

//Actualizar contraseña 
router.get("/passwordRecovery/:token", verifyTokenPasswordChange) 
router.post("/passwordRecovery/:token", updatePassword)

export default router; 