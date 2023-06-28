const { dataTableCPSIWhithOutDealer } = require("../../models/bi/getTablaNewCPSIWhitOutDealer");

const tableCpsiWhithOutDealer = async (req, res) => {
    try {
       const resultTableCPSIWhithOutDealer = await dataTableCPSIWhithOutDealer(req.query)
        res.send(resultTableCPSIWhithOutDealer)
      } catch(err) {
        res.status(400).send({
          mns: err.message
        })
      } 
}

module.exports = {
    tableCpsiWhithOutDealer
};