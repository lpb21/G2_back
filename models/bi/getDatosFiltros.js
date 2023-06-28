const { modeloGeneral } = require("./tablaGRAFICA_CPSI_WOS_TOTAL_PRUEBA");
//const Sequelize = require("sequelize");
//const { QueryTypes } = require("sequelize");


// *Consultando datos de la tabla con el modelo anterior (BI)
async function dataWithFiltros(dataFiltersFront = {}) {
  const year1 = dataFiltersFront.YEAR_1 && dataFiltersFront.YEAR_1[0] ? dataFiltersFront.YEAR_1[0] : '2023';
  
  const dataFilters = {
    ...dataFiltersFront,
    YEAR_1: [year1]
  };
  
  try {
    const sequelize = modeloGeneral.sequelize;
    const resultBusqueda2 = await modeloGeneral.findAll({
      attributes: [
        "week_1",
        [sequelize.fn("sum", sequelize.col("SO_Y-1")), "SELL_RF_ANIO_ANTERIOR"],
        [sequelize.fn("sum", sequelize.col("SO")), "SELL_RF_ANIO_ACTUAL"],
        [sequelize.fn("sum", sequelize.col("I_SELL_21")), "ANIO_ANTERIOR_SELL_INV"],
        [sequelize.fn("sum", sequelize.col("I_SELL_22_N")), "ANIO_ACTUAL_SELL_INV"],
        [sequelize.fn("sum", sequelize.col("SI_Y1")), "RF_ANIO_ANTERIOR"],
        [sequelize.fn("sum", sequelize.col("SI_k")), "RF_ACTUAL"],
      ],
      where: dataFilters,
      group: ["WEEK_1"],
      order: ["WEEK_1"],
      raw: true,
    });
    return {
        data:resultBusqueda2
    }
  } catch (err) {
    throw new Error(err.message || err.stack || 'error / line 31 GetFilters_Model')
  }
}

module.exports = {
  dataWithFiltros,
};
