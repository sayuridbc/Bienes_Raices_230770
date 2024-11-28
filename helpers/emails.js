import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:  process.env.EMAIL_PORT,
    auth: {
      user:  process.env.EMAIL_USER,
      pass:  process.env.EMAIL_PASS
    }
  });
  const  { email , nombre , token} = datos
  //Enviar emial
  await transport.sendMail({
      from : 'BienesRaices_230770.com',
      to : email,
      subject : 'Confirma tu cuenta en BienesRaices_230770.com',
      text : 'Confirma tu cuenta en BienesRaices_230770.com',
      html : `
          <p>Hola ${nombre} , comprueba tu cuenta en BienesRaices_230770</p>

           <p>Tu cuenta ya esta lista , solo debes confirmar en el siguiente enlace:
           <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta </a> </p>

          <p>Si tu no creaste esta cuenta , puedes ignorar el mensaje</p>

      `
  })
}

const emailChangePassword = async (datos) => {

  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port:  process.env.EMAIL_PORT,
      auth: {
        user:  process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASS
      }
    });
    const  { email , nombre , token} = datos
    //Enviar emial
    await transport.sendMail({
        from : 'BienesRaices_230770.com',
        to : email,
        subject : 'Solicitud de actualización de contraseña en BienesRaicec.com',
        text : 'Por favor actualiza tu contraseña para ingresar a la plataforma',
        html : `
            <p>Hola, <span style="color: red"> ${nombre}</span>,<br>
             Haz reportado el olvido o perdida de tu contraseña para acceder a tu cuenta de BienesRaices
             <br></p>
  
             <p>Por lo que necesitamos que ingreses a la siguiente liga para:
             <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Actualizar Contraseña </a> </p>
  
            <p>Si tu no creaste esta cuenta , puedes ignorar el mensaje</p>
  
        `
    })
  }
  


export {
    emailRegistro
}