const { dataTableCPSI } = require("../../models/bi/getTablaCPSI");

const tableCpsiGral = async (req, res) => {
    try {
       const resultTableCPSI = await dataTableCPSI(req.query)
        res.send(resultTableCPSI) 
      } catch(err) {
        res.status(400).send({
          mns: err.message
        })
      } 
}

module.exports = {
    tableCpsiGral
};