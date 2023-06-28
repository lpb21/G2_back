const { modeloGeneral } = require("./tablaGRAFICA_CPSI_WOS_TOTAL_PRUEBA");
const {modeloGeneralVista } = require("./tabla_v_GRAFICA_CPSI_WOS_TOTAL_PRUEBA")
const {grafica_CPSI_WOS_TOTAL_SIN_REFE_PRUEBA} = require("./defines/grafica_CPSI_WOS_TOTAL_SIN_REFE_PRUEBA")
const sequelize = require("sequelize");
const { calendario_comercial } = require("./defines/calendar_comercial");

// *Obteniendo datos de la tabla con base al modelo general
async function dataTableCPSI2(dataFiltersFront = {}) {
  //console.log(7,dataFiltersFront)
  const year1 = dataFiltersFront.YEAR_1 && dataFiltersFront.YEAR_1 ? dataFiltersFront.YEAR_1[0] : '2023';
  const dealerBI = dataFiltersFront.DEALER && dataFiltersFront.DEALER[0] ? dataFiltersFront.DEALER[0]: "";

  const dataFilters = {
    ...dataFiltersFront,
    YEAR_1: [year1],
  }
  //console.log(15,dataFilters)

  // * En el siguiente if se excluye el objeto DEALER para que no sea tomado en el where de la consulta
if (dealerBI !== "") {
  delete dataFilters.DEALER;
}
//console.log(25, dataFilters)

  try {
    
    const resultTableCPSI2  = await modeloGeneral.findAll({
     // const resultTableCPSI2  = await grafica_CPSI_WOS_TOTAL_SIN_REFE_PRUEBA.findAll({
        attributes: [
          'week_1',
              [sequelize.literal('[week_1]'), 'Measure'],

              [sequelize.literal("WEEK_TIPO"), 'WEEK_TIPO'],
              [sequelize.literal("FORMAT(SUM(SI_P), 'N0')"), 'P |PM|'],
              [sequelize.literal("FORMAT(SUM(SI_K), 'N0')"), 'P |KAM|'],
              [sequelize.literal("FORMAT(SUM(SI_Y1), 'N0')"), 'P |Y-1|'],

              // [sequelize.literal("MES"), 'MES'],
              [sequelize.literal("FORMAT(SUM(SO), 'N0')"), 'S |R+F|'],

              [sequelize.literal("FORMAT(SUM([SO_Y-1]), 'N0')"), 'S |Y-1|'],

              [sequelize.literal("FORMAT(ROUND(SUM([SO_AMT])/1000,0), 'N0')"), 'S |R+F| USD'],
              [sequelize.literal("FORMAT(ROUND(SUM([SO_Y-1_AMT])/1000,0), 'N0')"), 'S |Y-1| USD'],

              [sequelize.literal("CONCAT(ROUND((SUM(SO_AMT)/NULLIF((SUM([SO_Y-1_AMT])), 0)) * 100, 0)-1, '%')"), 'USD ∆ VS Y-1'],

              [sequelize.literal("FORMAT(ROUND(SUM([SO_AMT_COP]/1000),0), 'N0')"), 'S |R+F| COP'],
              [sequelize.literal("FORMAT(ROUND(SUM([SO_Y-1_AMT_COP]/1000),0), 'N0')"), 'S |Y-1| COP'],
              [sequelize.literal("CONCAT(ROUND((SUM(SO_AMT_COP)/NULLIF((SUM([SO_Y-1_AMT_COP])), 0)) * 100, 0)-1, '%')"), 'COP ∆ VS Y-1'],

              [sequelize.literal("FORMAT(SUM(SO_FCTS_W1), 'N0')"), 'S FCST W-1'],
              [sequelize.literal("CONCAT(ROUND((SUM(SO)/NULLIF((SUM([SO_FCTS_W1])), 0)) * 100, 0), '%')"), 'AR% FCST W-1'],
              [sequelize.literal("FORMAT(SUM(I_SELL_22_N), 'N0')"), 'SELLABLE INV'],
              [sequelize.literal("FORMAT(SUM(FLOORING_22), 'N0')"), 'DISPLAY INV'],

              [sequelize.literal("FORMAT(ROUND(COALESCE(SUM(I_SELL_22_N) / NULLIF((SUM([SO_22_W_4]) / 4), 0), 0),1),'0.0')"), 'WOS-4 |QTY|'],
              [sequelize.literal("FORMAT(ROUND(COALESCE(SUM(I_SELL_22_N) /NULLIF((SUM([SO_22_W+8]) / 8), 0), 0),1),'0.0')"), 'WOS+8 |QTY|'],
              [sequelize.literal("FORMAT(ROUND(COALESCE(SUM(INV_SELL_AMT) / NULLIF((SUM([SO_AMT_W-4]) / 4), 0), 0), 1),'0.0')"), 'WOS-4 |AMT|'],
              [sequelize.literal("FORMAT(ROUND(COALESCE(SUM(INV_SELL_AMT) /NULLIF((SUM([SO_AMT_W+8]) / 8), 0), 0),1),'0.0')"), 'WOS+8 |AMT|']
          ],
          where:dataFilters,
          group: ['WEEK_1','WEEK_TIPO'],
          order: [['week_1', 'ASC',]],
          raw: true
    });

    // const query = resultTableCPSI2[0].query; // Obtener el query SQL generado
    //     console.log(62,query);

    let dataCpsi = {
        'Measure': [],
        'WEEK_TIPO': [],
        'P |PM|': [],
        'P |KAM|': [],
        'P |Y-1|': [],
        // 'MES': [],
        'S |R+F|': [],
        'S |Y-1|': [],
        'S |R+F| USD': [],
        'S |Y-1| USD': [],
        'USD ∆ VS Y-1':[],
        'S |R+F| COP':[],
        'S |Y-1| COP':[],
        'COP ∆ VS Y-1':[],
        'S FCST W-1':[],
        'AR% FCST W-1':[],
        'SELLABLE INV':[],
        'DISPLAY INV':[],
        'WOS-4 |QTY|':[],
        'WOS+8 |QTY|':[],
        'WOS-4 |AMT|':[],
        'WOS+8 |AMT|':[],
    }

    resultTableCPSI2.forEach(row => {
      dataCpsi = {
        ...dataCpsi,
        'Measure': [...dataCpsi["Measure"], row["Measure"]],
        'WEEK_TIPO': [...dataCpsi["WEEK_TIPO"], row["WEEK_TIPO"]],
        "P |PM|": [...dataCpsi["P |PM|"], row["P |PM|"]],
        "P |KAM|": [...dataCpsi["P |KAM|"], row["P |KAM|"]],
        "P |Y-1|": [...dataCpsi["P |Y-1|"], row["P |Y-1|"]],
        // "MES": [...dataCpsi["MES"], row["MES"]],
        "S |R+F|": [...dataCpsi["S |R+F|"], row["S |R+F|"]],
        "S |Y-1|": [...dataCpsi["S |Y-1|"], row["S |Y-1|"]],
        "S |R+F| USD": [...dataCpsi["S |R+F| USD"], row["S |R+F| USD"]],
        "S |Y-1| USD": [...dataCpsi["S |Y-1| USD"], row["S |Y-1| USD"]],
        "USD ∆ VS Y-1": [...dataCpsi["USD ∆ VS Y-1"], row["USD ∆ VS Y-1"]],
        "S |R+F| COP": [...dataCpsi["S |R+F| COP"], row["S |R+F| COP"]],
        "S |Y-1| COP": [...dataCpsi["S |Y-1| COP"], row["S |Y-1| COP"]],
        "COP ∆ VS Y-1": [...dataCpsi["COP ∆ VS Y-1"], row["COP ∆ VS Y-1"]],
        "S FCST W-1": [...dataCpsi["S FCST W-1"], row["S FCST W-1"]],
        "AR% FCST W-1": [...dataCpsi["AR% FCST W-1"], row["AR% FCST W-1"]],
        "SELLABLE INV": [...dataCpsi["SELLABLE INV"], row["SELLABLE INV"]],
        "DISPLAY INV": [...dataCpsi["DISPLAY INV"], row["DISPLAY INV"]],
        "WOS-4 |QTY|": [...dataCpsi["WOS-4 |QTY|"], row["WOS-4 |QTY|"]],
        "WOS+8 |QTY|": [...dataCpsi["WOS+8 |QTY|"], row["WOS+8 |QTY|"]],
        "WOS-4 |AMT|": [...dataCpsi["WOS-4 |AMT|"], row["WOS-4 |AMT|"]],
        "WOS+8 |AMT|": [...dataCpsi["WOS+8 |AMT|"], row["WOS+8 |AMT|"]]
      };
    });

    return {
      data :[
        dataCpsi
      ] 
    };

  } catch (err) {
    throw new Error(err.message || err.stack || 'error / line 130 T.CPSI_Model')
  }
}

async function dataViewTableMonthWeek(dataFiltersFront = {}) {
  //console.log(128,dataFiltersFront)
  const year1 = dataFiltersFront.YEAR_1 && dataFiltersFront.YEAR_1 ? dataFiltersFront.YEAR_1[0] : '2023';
  const dealerBI = dataFiltersFront.DEALER && dataFiltersFront.DEALER[0] ? dataFiltersFront.DEALER[0]: "";

  const dataFilters = {
    ...dataFiltersFront,
    YEAR_1: [year1],
  }

  // * En el siguiente if se excluye el objeto DEALER para que no sea tomado en el where de la consulta
if (dealerBI !== "") {
  delete dataFilters.DEALER;
}
//console.log(25, dataFilters)

  try {
    
    const resultTableView  = await modeloGeneralVista.findAll({
        attributes: [
          'week_1',
              [sequelize.literal('[week_1]'), 'Measure'],
              [sequelize.literal("WEEK_TIPO"), 'WEEK_TIPO'],
              [sequelize.literal("MES"), 'MES'],
              [sequelize.literal("FORMAT(SUM(SO), 'N0')"), 'SO'],
          ],
          where:dataFilters,
          group: ['WEEK_1','WEEK_TIPO','MES'],
          order: [['week_1', 'ASC']],
          raw: true
    });
//console.log(resultTableView)

    let dataCpsi = {
        'Measure': [],
        'WEEK_TIPO': [],
        'SO': [],
    }

    resultTableView.forEach(row => {
      dataCpsi = {
        ...dataCpsi,
        'Measure': [...dataCpsi["Measure"], row["Measure"]],
        'WEEK_TIPO': [...dataCpsi["WEEK_TIPO"], row["WEEK_TIPO"]],
        
        "SO": [...dataCpsi["SO"], row["SO"]],
        
      };
    });

    return {
      resultTableView
    };

  } catch (err) {
    throw new Error(err.message || err.stack || 'error / line 220 View.CPSI_Model')
  }
}

const calendarComercialMdl = async () => {
  try {
    const result = await calendario_comercial.findAll()
    let output = {

    }
    // console.log(result)
    for (const key in result) {
      const { DEALER , WEEK_1 ,  PLAN } = result[key]
      output[DEALER] = {
          ...output[DEALER] || {},
          [WEEK_1] : PLAN
      }
    }
    return output
  } catch (err) {
    throw new Error(err.message || err.stack || 'error / line 130 T.CPSI_Model')
  }
}

module.exports = {
  dataTableCPSI2,
  dataViewTableMonthWeek,
  calendarComercialMdl
};
