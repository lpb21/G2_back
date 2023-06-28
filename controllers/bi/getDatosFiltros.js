const { dataWithFiltros } = require("../../models/bi/getDatosFiltros");

const filtros = async (req, res) => {
    try {
       const resultBiWithFilters = await dataWithFiltros(req.query)
        res.send(resultBiWithFilters)
      } catch(err) {
        res.status(400).send({
          mns: err.message
        })
      } 
}

module.exports = {
    filtros
};