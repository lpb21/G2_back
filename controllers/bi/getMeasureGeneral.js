const { dataMeasureGral } = require("../../models/bi/getMeasureGeneral");

const measureGeneral = async (req, res) => {
    try {
       const resultBiMeasure = await dataMeasureGral(req.query)
        res.send(resultBiMeasure)  
      } catch(err) {
        res.status(400).send({
          mns: err.message
        })
      } 
}

module.exports = {
    measureGeneral
};