const { dataptmexpensespptoinsertgMySQL } = require("../../models/pmt/promotores_insert");

const promotores = async (req, res) => {
    try {
        const insert = await dataptmexpensespptoinsertgMySQL(req.body)
        res.send(insert);
      } catch(err) {  
        res.status(500).send({
          mns: err.message || err.stack 
        })
      }
}

module.exports = {
  promotores
};