const { modeloGeneral } = require("./tablaGRAFICA_CPSI_WOS_TOTAL_PRUEBA");
const sequelize = require("sequelize");

// *Obteniendo datos de la tabla con base al modelo general
async function dataTableCPSIWhithOutDealer(dataFiltersFront = {}) {
  //console.log(6,dataFiltersFront)
  const year1 = dataFiltersFront.YEAR_1 && dataFiltersFront.YEAR_1[0]? dataFiltersFront.YEAR_1[0]: "2023";
  const dealerBI = dataFiltersFront.DEALER && dataFiltersFront.DEALER[0] ? dataFiltersFront.DEALER[0]: [];

  const dataFiltersWithoutDealer = {
    ...dataFiltersFront,
    YEAR_1: [year1],
  };
  
  if (dealerBI != "") {
    //if (!dealerBI) {
    // * Entra a la validacion en caso de tener dato ya que sin el if muestra celdas vacias
    try {
        // * Se Crea un array de objetos 'dealers' con los dealers enviados en el objeto 'dealerBI'
        const dealers = dataFiltersFront.DEALER ? dataFiltersFront.DEALER.map((d) => ({ DEALER: d })): [{ DEALER: [] }];
    
        let resultados = {};
        // * Se ecorre el array 'dealers' y ejecuta la consulta SQL para cada distribuidor
        for (const d of dealers) {
          const { DEALER } = d;
          //console.log(25, DEALER)
          resultados[DEALER] = await modeloGeneral.findAll({
            //const result = await modeloGeneral.findAll({
            attributes: [
              [sequelize.literal("WEEK_TIPO"), "WEEK_TIPO"],
              [sequelize.literal(`'${DEALER}'`), "DEALER"],
              [sequelize.literal("FORMAT(SUM(SI_P), 'N0')"), "P |PM|"],
              [sequelize.literal("FORMAT(SUM(SI_K), 'N0')"), "P |KAM|"],
              [sequelize.literal("FORMAT(SUM(SI_Y1), 'N0')"), "P |Y-1|"],
              [sequelize.literal("FORMAT(SUM(SO), 'N0')"), "S |R+F|"],
              [sequelize.literal("FORMAT(SUM([SO_Y-1]), 'N0')"), "S |Y-1|"],
              [sequelize.literal("FORMAT(ROUND(SUM([SO_AMT])/1000,0), 'N0')"),"S |R+F| USD",],
              [sequelize.literal("FORMAT(ROUND(SUM([SO_Y-1_AMT])/1000,0), 'N0')"),"S |Y-1| USD",],
              [sequelize.literal("CONCAT(ROUND((SUM(SO_AMT)/NULLIF((SUM([SO_Y-1_AMT])), 0)) * 100, 0)-1, '%')"),"USD ∆ VS Y-1",],
              [sequelize.literal("FORMAT(ROUND(SUM([SO_AMT_COP]/1000),0), 'N0')"),"S |R+F| COP",],
              [sequelize.literal("FORMAT(ROUND(SUM([SO_Y-1_AMT_COP]/1000),0), 'N0')"),"S |Y-1| COP",],
              [sequelize.literal("CONCAT(ROUND((SUM(SO_AMT_COP)/NULLIF((SUM([SO_Y-1_AMT_COP])), 0)) * 100, 0)-1, '%')"),"COP ∆ VS Y-1",],
              [sequelize.literal("FORMAT(SUM(SO_FCTS_W1), 'N0')"), "S FCST W-1"],
              [sequelize.literal("CONCAT(ROUND((SUM(SO)/NULLIF((SUM([SO_FCTS_W1])), 0)) * 100, 0), '%')"),"AR% FCST W-1",],
              [sequelize.literal("FORMAT(SUM(I_SELL_22_N), 'N0')"), "SELLABLE INV"],
              [sequelize.literal("FORMAT(SUM(FLOORING_22), 'N0')"), "DISPLAY INV"],
              [sequelize.literal("FORMAT(ROUND(COALESCE(SUM(I_SELL_22_N) / NULLIF((SUM([SO_22_W_4]) / 4), 0), 0),1),'0.0')"),"WOS-4 |QTY|",],
              [sequelize.literal("FORMAT(ROUND(COALESCE(SUM(I_SELL_22_N) /NULLIF((SUM([SO_22_W+8]) / 8), 0), 0),1),'0.0')"),"WOS+8 |QTY|",],
              [sequelize.literal("FORMAT(ROUND(COALESCE(SUM(INV_SELL_AMT) / NULLIF((SUM([SO_AMT_W-4]) / 4), 0), 0), 1),'0.0')"),"WOS-4 |AMT|",],
              [sequelize.literal("FORMAT(ROUND(COALESCE(SUM(INV_SELL_AMT) /NULLIF((SUM([SO_AMT_W+8]) / 8), 0), 0),1),'0.0')"),"WOS+8 |AMT|",],
    
            ],
            where: {
              ...dataFiltersWithoutDealer,
              DEALER
            },
            group: ["week_1", "WEEK_TIPO"],
            order: [["week_1", "ASC"]],
            raw: true,
          })
        }
        
    
        // * trasformando el json
        let newCur = {};
        for (const key of Object.keys(resultados)) {
            
          // let week_1 = resultados[key].map((valor) => {
          //   const { Measure } = valor;
          //   return Measure;
          // });
          let weekTipo = resultados[key].map((valor) => {
            const { WEEK_TIPO } = valor;
            return WEEK_TIPO;
          });
          let dealer = resultados[key].map((valor) => {
            const { DEALER } = valor;
            return DEALER;
          });
          let PKam = resultados[key].map((valor) => {
            const { ["P |KAM|"]: PKam } = valor;
            return PKam;
          });
          let pm = resultados[key].map((valor) => {
            const { ["P |PM|"]: pm } = valor;
            return pm;
          });
          let py1 = resultados[key].map((valor) => {
            const { ["P |Y-1|"]: py1 } = valor;
            return py1;
          });
          let srf = resultados[key].map((valor) => {
            const { ["S |R+F|"]: srf } = valor;
            return srf;
          });
          let sy_1 = resultados[key].map((valor) => {
            const { ["S |Y-1|"]: sy_1 } = valor;
            return sy_1;
          });
          let srfUSD = resultados[key].map((valor) => {
            const { ["S |R+F| USD"]: srfUSD } = valor;
            return srfUSD;
          });
          let sy_1USD = resultados[key].map((valor) => {
            const { ["S |Y-1| USD"]: sy_1USD } = valor;
            return sy_1USD;
          });
          let usdVsY_1 = resultados[key].map((valor) => {
            const { ["USD ∆ VS Y-1"]: usdVsY_1 } = valor;
            return usdVsY_1;
          });
          let sfrCOP = resultados[key].map((valor) => {
            const { ["S |R+F| COP"]: sfrCOP } = valor;
            return sfrCOP;
          });
          let sy_1COP = resultados[key].map((valor) => {
            const { ["S |Y-1| COP"]: sy_1COP } = valor;
            return sy_1COP;
          });
          let copVsY_1 = resultados[key].map((valor) => {
            const { ["COP ∆ VS Y-1"]: copVsY_1 } = valor;
            return copVsY_1;
          });
          let sfcstW_1 = resultados[key].map((valor) => {
            const { ["S FCST W-1"]: sfcstW_1 } = valor;
            return sfcstW_1;
          });
          let arfcstW_1 = resultados[key].map((valor) => {
            const { ["AR% FCST W-1"]: arfcstW_1 } = valor;
            return arfcstW_1;
          });
          let sellableInv = resultados[key].map((valor) => {
            const { ["SELLABLE INV"]: sellableInv } = valor;
            return sellableInv;
          });
          let displayInv = resultados[key].map((valor) => {
            const { ["DISPLAY INV"]: displayInv } = valor;
            return displayInv;
          });
          let wos_4QTY = resultados[key].map((valor) => {
            const { ["WOS-4 |QTY|"]: wos_4QTY } = valor;
            return wos_4QTY;
          });
          let wosM8QTY = resultados[key].map((valor) => {
            const { ["WOS+8 |QTY|"]: wosM8QTY } = valor;
            return wosM8QTY;
          });
          let wos_4AMT = resultados[key].map((valor) => {
            const { ["WOS-4 |AMT|"]: wos_4AMT } = valor;
            return wos_4AMT;
          });
          let wosM8AMT = resultados[key].map((valor) => {
            const { ["WOS+8 |AMT|"]: wosM8AMT } = valor;
            return wosM8AMT;
          });
    
          newCur[key] = {
            // week_1,
            // Measure: week_1,
            WEEK_TIPO: weekTipo,
            DEALER: dealer,
            "P |PM|": pm,
            "P |KAM|": PKam,
            "P |Y-1|": py1,
            "S |R+F|": srf,
            "S |Y-1|": sy_1,
            "S |R+F| USD": srfUSD,
            "S |Y-1| USD": sy_1USD,
            "USD ∆ VS Y-1": usdVsY_1,
            "S |R+F| COP": sfrCOP,
            "S |Y-1| COP": sy_1COP,
            "COP ∆ VS Y-1": copVsY_1,
            "S FCST W-1": sfcstW_1,
            "AR% FCST W-1": arfcstW_1,
            "SELLABLE INV": sellableInv,
            "DISPLAY INV": displayInv,
            "WOS-4 |QTY|": wos_4QTY,
            "WOS+8 |QTY|": wosM8QTY,
            "WOS-4 |AMT|": wos_4AMT,
            "WOS+8 |AMT|": wosM8AMT,
          }
          
        }
        return {
          data: newCur,
        }
      } catch (err) {
        throw new Error(
          err.message || err.stack || "error / line 192 T.CPSI_ModelDealer"
        );
      }

  }else{
    console.log("sin datos")
    //throw new Error("!!!!!SIN DATOS");
  }
  
}

module.exports = {
  dataTableCPSIWhithOutDealer,
};
