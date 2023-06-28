const { validationResult } = require('express-validator')
const { validateOtp, validateUsersLogin } = require("../../models/user/userMdl")

const getUsers = async (req, res) => {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res.status(400).send(
          { 
            mns: 'Campos requeridos user,pass,otp'
          }
        )
      }
      // Validar Usuario.
      const user_id = await validateUsersLogin(req.body)
      const { otp } = req.body
      const otpValid = await validateOtp( { otp, user_id})
      
      return res.send(
        {
          user_id,
          otpValid
        }
      )
    } catch(err) {
      const code = 400
      res.status(code).send({
        mns : err.message || err.stack  || 'No Identificado'
      })
    }
}

const otpUser = async (req, res) => {
  try { 
    const data = await validateOtp(req.query)
    res.send({
      data
    })
  }catch(error) {
    res.status(400).send({
      mns: error.message || error.stack
    })
  }
}

module.exports = {
    getUsers,
    otpUser
}
