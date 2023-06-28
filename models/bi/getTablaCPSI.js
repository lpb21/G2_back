const { modeloGeneral } = require("./tablaGRAFICA_CPSI_WOS_TOTAL_PRUEBA");
const sequelize = require("sequelize");

// *Obteniendo datos de la tabla con base al modelo general
async function dataTableCPSI(dataFiltersFront = {}) {
  
  try {
   
    const anioactual =  new Date().getFullYear()
    const year_bi   = !!dataFiltersFront.YEAR_1 ? dataFiltersFront.YEAR_1[0].toString().substring(2) : anioactual.toString().substring(2)
    //console.log(year_bi)
    const resultTableCPSI  = await modeloGeneral.findAll({
        attributes: [
            "week_1",
              [sequelize.literal('SUM(SI_P)'), 'P |PM|'],
              [sequelize.literal('SUM(SI_K)'), 'P |KAM|'],
              [sequelize.literal('SUM(SI_Y1)'), 'P |Y-1|'],

              [sequelize.literal('SUM(SO)'), 'S |R+F|'],
              [sequelize.literal('SUM([SO_Y-1])'), 'S |Y-1|'],
              
              [sequelize.literal('ROUND(SUM([SO_AMT])/1000,0)'), 'S|R+F|USD|'],
              [sequelize.literal('ROUND(SUM([SO_Y-1_AMT])/1000,0)'), 'S|Y-1|USD|'],
              [sequelize.literal("CONCAT(ROUND((SUM(SO_AMT)/NULLIF((SUM([SO_Y-1_AMT])), 0)) * 100, 1)-1, '%')"), 'USD ∆ Vs Y-1'],

              [sequelize.literal("FORMAT(ROUND(SUM([SO_AMT_COP]/1000),0), 'N0')"), 'S|R+F|COP|'],
              [sequelize.literal("FORMAT(ROUND(SUM([SO_Y-1_AMT_COP]/1000),0), 'N0')"), 'S|Y-1|COP|'],
              [sequelize.literal("CONCAT(ROUND((SUM(SO_AMT_COP)/NULLIF((SUM([SO_Y-1_AMT_COP])), 0)) * 100, 1)-1, '%')"), 'COP ∆ Vs Y-1'],

              [sequelize.literal('SUM(SO_FCTS_W1)'), 'S Fcst W-1'],
              [sequelize.literal("CONCAT(ROUND((SUM(SO)/NULLIF((SUM([SO_FCTS_W1])), 0)) * 100, 1), '%')"), 'AR% Fcst W-1'],
              [sequelize.literal('SUM(I_SELL_22_N)'), 'Sellable Inv'],
              [sequelize.literal('SUM(FLOORING_22)'), 'Display Inv'],

              [sequelize.literal('ROUND(COALESCE(SUM(I_SELL_22_N) / NULLIF((SUM([SO_22_W_4]) / 4), 0), 0),1)'), 'Wos-4 |Qty|'],
              [sequelize.literal('ROUND(COALESCE(SUM(I_SELL_22_N) /NULLIF((SUM([SO_22_W+8]) / 8), 0), 0),1)'), 'Wos+8 |Qty|'],
              [sequelize.literal('ROUND(COALESCE(SUM(INV_SELL_AMT) / NULLIF((SUM([SO_AMT_W-4]) / 4), 0), 0), 1)'), 'Wos-4 |Amt|'],
              [sequelize.literal('ROUND(COALESCE(SUM(INV_SELL_AMT) /NULLIF((SUM([SO_AMT_W+8]) / 8), 0), 0),1)'), 'Wos+8 |Amt|']
          ],
          where:{ ...dataFiltersFront
          },
          group: ['WEEK_1'],
          raw: true
    });
    return {
        data:resultTableCPSI
    };
  } catch (err) {
    throw new Error(err.message || err.stack || 'error / line 49 TableCPSI_Model')
  }
}

module.exports = {
    dataTableCPSI,
};
