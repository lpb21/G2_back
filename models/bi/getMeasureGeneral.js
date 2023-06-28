const { modeloGeneral } = require("./tablaGRAFICA_CPSI_WOS_TOTAL_PRUEBA");
const sequelize = require("sequelize");

// *Obteniendo datos de la tabla con base al modelo general
async function dataMeasureGral(dataFiltersFront = {}) {
  
  try {
   
    const anioactual =  new Date().getFullYear()
    const year_bi   = !!dataFiltersFront.YEAR_1 ? dataFiltersFront.YEAR_1[0].toString().substring(2) : anioactual.toString().substring(2)
    //console.log(year_bi)
    const resultMeasure  = await modeloGeneral.findAll({
        attributes: [
            "week_1",
              [sequelize.literal('ROUND(COALESCE(sum(I_SELL_21) / NULLIF((SUM([SO_21_W_4]) / 4), 0), 0), 1)'), 'Wos-4 |Y-1|'],
              [sequelize.literal('ROUND(COALESCE(sum(I_SELL_22_N) / NULLIF((SUM([SO_22_W_4]) / 4), 0), 0),1)'), 'Wos-4 |R+F|'],

              [sequelize.literal('ROUND(COALESCE(sum(I_SELL_21) /NULLIF((sum([SO_21_W+8]) / 8), 0), 0),1)'), 'Wos+8 |Y-1|'],
              [sequelize.literal('ROUND(COALESCE(sum(I_SELL_22_N) /NULLIF((sum([SO_22_W+8]) / 8), 0), 0),1)'), 'Wos+8 |R+F|'],
              
              [sequelize.literal('ROUND(sum([FLOORING_21])/1000,1)'), 'Flooring |Y-1|'],
              [sequelize.literal('ROUND(sum([FLOORING_22])/1000,1)'), 'Flooring |R+F|'],

              [sequelize.literal('ROUND(COALESCE(sum([SO_Y-1])/NULLIF(SUM(FLOORING_21), 0), 0),1)'), 'WRR |Y-1|'],
              [sequelize.literal('ROUND(COALESCE(sum([SO])/NULLIF(SUM(FLOORING_22), 0), 0),1)'), 'WRR |R+F|'],

              [sequelize.literal("CONCAT(ROUND((SUM(SO)/NULLIF((SUM(SO_FCTS_W1)), 0)) * 100, 1), '%')"), 'Forcast'],

          ],
          where:{ ...dataFiltersFront
          },
          group: ['WEEK_1'],
          raw: true
    });
    return {
        data:resultMeasure
    }
  } catch (err) {
    throw new Error(err.message || err.stack || 'error / line 39 Measure_Model')
  }
}

module.exports = {
    dataMeasureGral,
};
