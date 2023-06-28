const {authenticator} = require('otplib')
const sha1 = require('sha1')
const { ModeloTablaUserGTM2 } = require('./defines/user')

 const validateOtp = async ( {otp= '', user_id = ''}) => {
  try {
    const credentials = `lgecbOTP_@lgeuser12@#${user_id}`
    const secret = await encode(credentials)
    const isValid  = authenticator.check(otp,secret)
    if (!isValid) {
      throw new Error('Error de Otp')
    }
    return {isValid}
  }catch (error) {
    throw new Error(error.message || error.stack)
  }
}


const encode = async (rawString) => {
  // Unpack string into an array of bytes
  // var bytes = new Uint8Array(rawString.length);
  let bytes = []
  for (let i = 0; i < rawString.length; i++) {
    bytes[i] = rawString.charCodeAt(i);
  }
  
  var byteCount = bytes.length;
  var encodedString = '';
  var byte = bytes.shift();
  var bitsRead = 0;

  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  var bitsPerCharacter = 5
  var rightPadFinalBits = 1
  var padFinalGroup = 1
  var padCharacter = '='

  // Generate encoded output;
  // each loop produces one encoded character
  for (var c = 0; c < byteCount * 8 / bitsPerCharacter; c++) {
    // Get the bits needed for this encoded character
    if (bitsRead + bitsPerCharacter > 8) {
      // Not enough bits remain in this byte for the current character
      // Save the remaining bits before getting the next byte
      var oldBitCount = 8 - bitsRead;
      var oldBits = byte ^ (byte >> oldBitCount << oldBitCount);
      var newBitCount = bitsPerCharacter - oldBitCount;

      if (!bytes.length) {
        // Last bits; match final character and exit loop
        if (rightPadFinalBits) {
          oldBits <<= newBitCount;
        }
        encodedString += chars[oldBits];

        if (padFinalGroup) {
          // Array of the lowest common multiples of
          // bitsPerCharacter and 8, divided by 8
          var lcmMap = { 1: 1, 2: 1, 3: 3, 4: 1, 5: 5, 6: 3, 7: 7, 8: 1 };
          var bytesPerGroup = lcmMap[bitsPerCharacter];
          var pads = bytesPerGroup * 8 / bitsPerCharacter - Math.ceil((rawString.length % bytesPerGroup) * 8 / bitsPerCharacter);
          encodedString += padCharacter[0].repeat(pads);
        }

        break;
      }
      // Get next byte
      byte = bytes.shift();
      bitsRead = 0;
    } else {
      var oldBitCount = 0;
      var newBitCount = bitsPerCharacter;
    }
    // Read only the needed bits from this byte
    var bits = byte >> 8 - (bitsRead + newBitCount);
    bits ^= bits >> newBitCount << newBitCount;
    bitsRead += newBitCount;

    if (oldBitCount) {
      // Bits come from separate bytes, add oldBits to bits
      bits = (oldBits << newBitCount) | bits;
    }
    encodedString += chars[bits];
  }
  return encodedString
}

const validateUsersLogin = async ({username='', password=''}) => {
  try {

    // Buscar Usuario.
    const infoUser  = await  ModeloTablaUserGTM2.findOne({ where: {
      username
    }})
    if (!infoUser) {
      throw new Error('User No find')
    }
    // Validar OTp.
    const { user_id = 0 } =  infoUser
    return user_id
  } catch (error) {
    throw new Error(error.message || error.stack || 'Error no Identificado')
  }
}

module.exports = {
  validateOtp,
  validateUsersLogin
}