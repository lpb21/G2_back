const { modeloGeneral } = require("./tablaGRAFICA_CPSI_WOS_TOTAL_PRUEBA");
const sequelize = require("sequelize");

// *Obteniendo datos de la tabla con base al modelo general
async function dataTableMeasure2(dataFiltersFront = {}) {
  const year1 = dataFiltersFront.YEAR_1 && dataFiltersFront.YEAR_1[0] ? dataFiltersFront.YEAR_1[0] : '2023';
  const dataFilters = {
    ...dataFiltersFront,
    YEAR_1: [year1]
  }
  try {
    
    const anioactual =  new Date().getFullYear()
    const year_bi   = !!dataFiltersFront.YEAR_1 ? dataFiltersFront.YEAR_1[0].toString().substring(2) : anioactual.toString().substring(2)
    
    const resultTableMeasure2  = await modeloGeneral.findAll({
        attributes: [
          'week_1',
              [sequelize.literal('[week_1]'), 'Measure'],
              [sequelize.literal("WEEK_TIPO"), 'WEEK_TIPO'],
              [sequelize.literal("FORMAT(ROUND(COALESCE(sum(I_SELL_21) / NULLIF((SUM([SO_21_W_4]) / 4), 0), 0), 1), '0.0')"), 'WOS-4 |Y-1|'],
              [sequelize.literal("FORMAT(ROUND(COALESCE(sum(I_SELL_22_N) / NULLIF((SUM([SO_22_W_4]) / 4), 0), 0),1), '0.0')"), 'WOS-4'], // WOS-4 |R+F|
              [sequelize.literal("FORMAT(ROUND(COALESCE(sum(I_SELL_21) /NULLIF((sum([SO_21_W+8]) / 8), 0), 0),1),'0.0')"), 'WOS+8 |Y-1|'], 
              [sequelize.literal("FORMAT(ROUND(COALESCE(sum(I_SELL_22_N) /NULLIF((sum([SO_22_W+8]) / 8), 0), 0),1),'0.0')"), 'WOS+8'], //WOS+8 |R+F| 
              [sequelize.literal('ROUND(sum([FLOORING_21])/1000,1)'), 'FLOORING |Y-1|'],
              [sequelize.literal("FORMAT(ROUND(COALESCE(sum([SO_Y-1])/NULLIF(SUM(FLOORING_21), 0), 0),1),'0.0')"), 'WRR |Y-1|'], 
              [sequelize.literal("FORMAT(ROUND(sum([FLOORING_22])/1000,1),'0.0')"), 'FLOORING |R+F|'],
              [sequelize.literal("FORMAT(ROUND(COALESCE(sum([SO])/NULLIF(SUM(FLOORING_22), 0), 0),1),'0.0')"), 'WRR |R+F|'],
              [sequelize.literal("CONCAT(ROUND((SUM(SO)/NULLIF((SUM(SO_FCTS_W1)), 0)) * 100, 0), '%')"), 'A/R% |FCST W-1|'],
          ],
          where:dataFilters,
          group: ['WEEK_1','WEEK_TIPO'],
          order: [['week_1', 'ASC']],
          raw: true
    });

    const data = [{
        'Measure': [],
        'WEEK_TIPO': [],
        'WOS-4 |Y-1|': [],
        'WOS-4': [],// WOS-4 |R+F|
        'WOS+8 |Y-1|': [],
        'WOS+8': [],//WOS+8 |R+F|
        'FLOORING |Y-1|': [],
        'WRR |Y-1|': [],
        'FLOORING |R+F|': [],
        'WRR |R+F|':[],
        'A/R% |FCST W-1|':[]
      }]

    resultTableMeasure2.forEach(row => {
      data[0] = {
        ...data[0],
        'Measure': [...data[0]["Measure"], row["Measure"]],
        'WEEK_TIPO': [...data[0]["WEEK_TIPO"], row["WEEK_TIPO"]],
        "WOS-4 |Y-1|": [...data[0]["WOS-4 |Y-1|"], row["WOS-4 |Y-1|"]],
        "WOS-4": [...data[0]["WOS-4"], row["WOS-4"]],
        "WOS+8 |Y-1|": [...data[0]["WOS+8 |Y-1|"], row["WOS+8 |Y-1|"]],
        "WOS+8": [...data[0]["WOS+8"], row["WOS+8"]],
        "FLOORING |Y-1|": [...data[0]["FLOORING |Y-1|"], row["FLOORING |Y-1|"]],
        "WRR |Y-1|": [...data[0]["WRR |Y-1|"], row["WRR |Y-1|"]],
        "FLOORING |R+F|": [...data[0]["FLOORING |R+F|"], row["FLOORING |R+F|"]],
        "WRR |R+F|": [...data[0]["WRR |R+F|"], row["WRR |R+F|"]],
        "A/R% |FCST W-1|": [...data[0]["A/R% |FCST W-1|"], row["A/R% |FCST W-1|"]]
      };
    });

    return {
      data : data
    };

  } catch (err) {
    throw new Error(err.message || err.stack || 'error / line 71 T.Measure_Model')
  }
}

module.exports = {
  dataTableMeasure2,
};
