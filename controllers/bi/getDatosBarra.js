const { dataWeekMsSQL } = require("../../models/bi/getDatosBarra");

const week = async (req, res) => {
    try {
       const resultWeek = await dataWeekMsSQL()
        res.send(resultWeek)
      } catch(err) {  
        throw err
      }
}

module.exports = {
    week
};