const { modeloGeneral } = require("./tablaGRAFICA_CPSI_WOS_TOTAL_PRUEBA");
const Sequelize = require("sequelize");

async function dataChannelMsSQL() {
  try {
    const resultbusqMssql = await modeloGeneral.findAll(
      {
        attributes: ["CHANNEL"],
        group: ["CHANNEL"],
        distinct: true,
        raw: true,
      } //,{where: {CHANNEL : 'HYPER'}}
    );

    //Recorre los elementos de lo que me genera la busqueda
    //let result1 = resultbusqMssql.forEach((element) => {
    //console.log(element.toJSON());
    //console.log(resultbusqMssql)
    //.map de los elementos
    const data = resultbusqMssql.map(function (index) {
      return {
        value: index.CHANNEL,
        label: index.CHANNEL,
      };
    });
    return {
      data,
    };
  } catch (err) {
    throw new Error(
      err.message || err.stack || "error / line 30 Channel_Model"
    );
  }
}

// *Datos del campo APROVED_REFERENCE
async function dataARMsSQL(dataaprovedRefFront = {}) {
  try {
    const resultbusqAR = await modeloGeneral.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('APPROVED_REFERENCE')), 'APPROVED_REFERENCE']],
      where: dataaprovedRefFront,
      raw: true,
    });

    const data = resultbusqAR.map(function (index) {
      return {
        value: index.APPROVED_REFERENCE,
        label: index.APPROVED_REFERENCE,
      }
    })
    return {
      data,
    }
  } catch (err) {
    throw new Error(err.message || err.stack || "error / line 30 AR_Model")
  }
}

// *Consultando datos de la tabla con el modelo general (BI)
async function dataInfoGeneralMsSQL(filtros = {}) {
  try {
    const resultbusqMssql = await modeloGeneral.findAll({
      order: [["CHANNEL", "ASC"]],
      // attributes: keys,
      where: filtros,
      offset: 0,
      raw: true,
      limit: 100,
    });

    const data = await resultbusqMssql;
    return {
      data,
    }
  } catch (err) {
    //throw err
  }
}

// *Consultando datos de la tabla con el modelo anterior (BI)
async function dataDealerMsSQL(dataDealerFront = {}) {
  try {
    //console.log(dataDealerFront)
    const resultbusqMssql = await modeloGeneral.findAll({
      //distinct: true,
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("DEALER")), "DEALER"],
      ],
      where: dataDealerFront,
      raw: true,
    });
    const data = resultbusqMssql.map(function (index) {
      return {
        value: index.DEALER,
        label: index.DEALER,
      };
    });
    return {
      data,
    };
  } catch (err) {
    throw new Error(err.message || err.stack || "error / line 27 Dealer_Model");
  }
}

// *Consultando datos de la tabla con el modelo de la tabla GRAFICA_CPSI_WOS_TOTAL_PRUEBA
async function dataPGMsSQL(dataPGFront = {}) {
  try {
    const resultbusqPG = await modeloGeneral.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("PG")), "PG"]],
      where: {
        [Sequelize.Op.and]: [
          dataPGFront,
          { PG: { [Sequelize.Op.not]: "ELIMINAR" } },
        ],
      },
      raw: true,
    });

    const data = resultbusqPG.map(function (index) {
      return {
        value: index.PG,
        label: index.PG,
      };
    });
    return {
      data,
    };
  } catch (err) {
    throw new Error(err.message || err.stack || "error / line 3 Pg_Model");
  }
}

// *Consultando datos de la tabla con el modelo de la tabla GRAFICA_CPSI_WOS_TOTAL_PRUEBA
async function dataPG2MsSQL(dataPG2Front = {}) {
  try {
    const resultbusqPG2 = await modeloGeneral.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("PG2")), "PG2"]],
      where: {
        [Sequelize.Op.and]: [
          dataPG2Front,
          { PG2: { [Sequelize.Op.not]: "ELIMINAR" } },
        ],
      },
      raw: true,
    });
    const data = resultbusqPG2.map(function (index) {
      return {
        value: index.PG2,
        label: index.PG2,
      };
    });
    return {
      data,
    };
  } catch (err) {
    throw new Error(err.message || err.stack || "error / line 27 Pg2_Model");
  }
}

// *Consultando datos de la tabla con el modelo de la tabla GRAFICA_CPSI_WOS_TOTAL_PRUEBA
async function dataPG_ToolMsSQL(dataPG_ToolFront = {}) {
  try {
    const resultbusqPG_Tool = await modeloGeneral.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("PG_TOOL")), "PG_TOOL"],
      ],
      where: {
        [Sequelize.Op.and]: [
          dataPG_ToolFront,
          { PG_TOOL: { [Sequelize.Op.not]: "ELIMINAR" } },
        ],
      },
      raw: true,
    });
    const data = resultbusqPG_Tool.map(function (index) {
      return {
        value: index.PG_TOOL,
        label: index.PG_TOOL,
      };
    });

    return {
      data,
    };
  } catch (err) {
    throw new Error(
      err.message || err.stack || "error / line 30 Pg_Tool_Model"
    );
  }
}

// *Consultando datos de la tabla con el modelo de la tabla GRAFICA_CPSI_WOS_TOTAL_PRUEBA
async function dataStatusMsSQL(dataStatusFront = {}) {
  try {
    const resultbusqStatus = await modeloGeneral.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("STATUS")), "STATUS"],
      ],
      where: dataStatusFront,
      raw: true,
    });
    const data = resultbusqStatus.map(function (index) {
      return {
        value: index.STATUS,
        label: index.STATUS,
      };
    });
    return {
      data,
    };
  } catch (err) {
    throw new Error(err.message || err.stack || "error / line 25 Status_Model");
  }
}

async function dataYearBI() {
  try {
    const resultYearBI = await modeloGeneral.findAll(
      {
        attributes: ["YEAR_1"],
        //attributes: ['ABRAVATION'],
        group: ["YEAR_1"],
        distinct: true,
        raw: true,
      } //,{where: {CHANNEL : 'HYPER'}}
    );

    //Recorre los elementos de lo que me genera la busqueda
    //let result1 = resultbusqMssql.forEach((element) => {
    //console.log(element.toJSON());
    //console.log(resultbusqMssql)
    //.map de los elementos
    const data = resultYearBI.map(function (index) {
      return {
        value: index.YEAR_1,
        label: index.YEAR_1,
      };
    });
    return {
      data,
    };
  } catch (err) {
    throw err;
  }
}

// *Consultando datos de la tabla con el modelo de la tabla GRAFICA_CPSI_WOS_TOTAL_PRUEBA
async function dataKMMsSQL(dataKey_modelsFront = {}) {
  try {
    const resultbusqKM = await modeloGeneral.findAll({
      //distinct: true,
      //attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('KEY_MODELS')), 'KEY_MODELS']],
      attributes: [
        [
          Sequelize.fn("DISTINCT", Sequelize.col("APPROVED_REFERENCE")),
          "APPROVED_REFERENCE",
        ],
        ["KEY_MODELS", "KEY_MODELS"],
      ],
      where: dataKey_modelsFront,
      //where : {APPROVED_REFERENCE : dataKey_modelsFront},
      raw: true,
    });
    //console.log(resultbusqKM)
    const data = {};

    for (const i of resultbusqKM) {
      const valorAR = i.APPROVED_REFERENCE;
      const valorKM = i.KEY_MODELS;
      /*Se verifica si el objeto data no tiene una propiedad con el nombre referencia,
        si el objeto data no tiene una propiedad con el nombre valorAR, entonces 
        se crea una propiedad con ese nombre y se le asigna un arreglo vacío.*/
      if (!data[valorAR]) {
        data[valorAR] = [];
      }
      /*se agrega un objeto con la propiedad KEY_MODELS y el valor correspondiente 
    al arreglo que se encuentra en la propiedad valorAR del objeto data
    - tiene como llaves los valores únicos de la propiedad APPROVED_REFERENCE y 
    como valores un arreglo con los objetos que contienen la propiedad KEY_MODELS*/
      data[valorAR].push({ KEY_MODELS: valorKM });
    }
    return { data };
  } catch (err) {
    throw err;
  }
}


async function dataRegionalMsSQL(dataDealerFront = {}) {
  try {
    //console.log(dataDealerFront)
    const resultbusqRegional = await modeloGeneral.findAll({
      //distinct: true,
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("REGIONAL")), "REGIONAL"],
      ],
      where: dataDealerFront,
      raw: true,
    });
    const data = resultbusqRegional.map(function (index) {
      return {
        value: index.REGIONAL,
        label: index.REGIONAL,
      };
    });
    return {
      data,
    };
  } catch (err) {
    throw new Error(err.message || err.stack || "error / line 320 Regional_Model");
  }
}

async function dataMajorCostMsSQL(dataDealerFront = {}) {
  try {
    //console.log(dataDealerFront)
    const resultbusqMajCost = await modeloGeneral.findAll({
      //distinct: true,
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("FOCO")), "FOCO"],
      ],
      where: dataDealerFront,
      raw: true,
    });
    const data = resultbusqMajCost.map(function (index) {
      return {
        value: index.FOCO,
        label: index.FOCO,
      };
    });
    return {
      data,
    };
  } catch (err) {
    throw new Error(err.message || err.stack || "error / line 345 MajorCostumer_Model");
  }
}

module.exports = {
  dataChannelMsSQL,
  dataARMsSQL,
  dataInfoGeneralMsSQL,
  dataDealerMsSQL,
  dataPGMsSQL,
  dataPG2MsSQL,
  dataPG_ToolMsSQL,
  dataStatusMsSQL,
  dataYearBI,
  dataKMMsSQL,
  dataRegionalMsSQL,
  dataMajorCostMsSQL
};
