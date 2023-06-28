const jwt = require('jsonwebtoken')

const { Config } = require("../src/config/index")

const sign =  (req, res ) => {
    // Falta validar usuario.
    const token = jwt.sign(
        {
            data: req.body
        },
        Config.SIGN_LG, 
            { 
                expiresIn: '4h' 
            }
        )    
    res.send({ token } )  
}


const headerVerifyToken = (req, res, next)  => {
    try {

        if(!req.headers['x-token-lg']) {
            throw new Error('Error description Token')
        }
        req = {
            ...req,
            token: req.headers['x-token-lg']
        }
        next()
    }catch(err) {
        res.status(404).send({
            msg: err.message
        })
    }
}


const verifyToken = async (req, res, next)  => {
    try {
        
        const token =  await jwt.verify(req.headers['x-token-lg'], Config.SIGN_LG)
        next()
        
    }catch(err) {
        res.status(403).send({
            msg: err.message
        })
    }
}

module.exports = {
    sign,
    headerVerifyToken,
    verifyToken
}


