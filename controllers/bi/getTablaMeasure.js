const { dataTableMeasure2 } = require("../../models/bi/getTablaMeasure");

const tableMeasureGral2 = async (req, res) => {
    try {
       const resultTableMeasure2 = await dataTableMeasure2(req.query)
        res.send(resultTableMeasure2)
      } catch(err) {
        res.status(400).send({
          mns: err.message
        })
      } 
}

module.exports = {
    tableMeasureGral2
};