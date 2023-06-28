const { dataTableCPSI2, dataViewTableMonthWeek, calendarComercialMdl } = require("../../models/bi/getTablaNewCPSI")

const tableCpsiGral2 = async (req, res) => {
  try {
    const resultTableCPSI2 = await dataTableCPSI2(req.query)
    res.send(resultTableCPSI2)
  } catch(err) {
    res.status(400).send({
      mns: err.message
    })
  } 
}

const tableCpsiView = async (req, res) => {
  try {
     const resultTableCPSIView = await dataViewTableMonthWeek(req.query)
      res.send(resultTableCPSIView)
    } catch(err) {
      res.status(400).send({
        mns: err.message
      })
  } 
}

const calendarComercial = async (req, res ) => {
  try {
    const data = await calendarComercialMdl()
    res.send(data)
  } catch(err) {
    res.status(400).send({
       mns: err.message
    })
  } 
}

module.exports = {
    tableCpsiGral2,
    tableCpsiView,
    calendarComercial
}