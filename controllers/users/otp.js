const otplib = require("otplib")
const qrcode = require("qrcode");
//const otpauth = require('otpauth' );
const QRCode = require('qrcode');

//const {authenticate} = require('google-auth-library');

// otplib.authenticator.options = {
//     algorithm: 'sha1',
//     digits: 6,
//     period: 30
//   };

//const secret = req.body.otp;
//console.log(`Secret: ${secret}`);
const otp = async (req, res) => {
  //const server = http.createServer((req, res) => {
  //const query = url.parse(req.url, true).query;
  //Genera un secreto compartido para el usuario
  const userID = req.body.userId;
  const userOtp = req.body.otp;
  const usrAndOTP = userID + userOtp;
  console.log(userID, userOtp);
  //const secret = otplib.authenticator.generateSecret();
  const secret = "JBSWY3DPEHPK3PXP";

  // OTP generado por la aplicación
  //const secret = otplib.authenticator.generateSecret();
  //console.log(`OTP generado por la aplicación: ${otpGenerado}`);
  console.log(`OTP enviado por el usuario: ${userOtp}`);

  //toma 3 parametros el userID, nombre de la app, el secret para generar el otp
  //key uri genera una url que se puede escanear con google authenticator

  //utiliza la función check del módulo authenticator de otplib
  //para comparar un OTP generado previamente vs la clave secreta.
  if (userOtp) {
    const isValid = otplib.authenticator.check(userOtp, secret);
    //console.log(`El OTP es válido?: ${isValid}`);
    if (!isValid) {
      // Aqui se configura el codigo qr con la funcion keyuri
      const qr = otplib.authenticator.keyuri(userID, "GTM2", secret);
      /*para generar una URL que representa la información necesaria para 
    configurar Google Authenticator. La URL se pasa a la función toDataURL 
    de qrcode para generar una imagen QR que puede ser mostrada al usuario.*/
      qrcode.toDataURL(qr, (err, url) => {
        console.log("OTP inválido");
        res.send(`<html>
                         <body>
                          <img src="${url}" />
                         </body>
                       </html>`);
      });
    } else {
      console.log("Autenticación fallida");
      res.send("Autenticación fallida");
    }
  } else {
    res.send("No se ha especificado un OTP");
  }
};

module.exports = {
  otp,
}
