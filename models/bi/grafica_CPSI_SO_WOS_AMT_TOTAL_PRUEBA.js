const Sequelize = require("sequelize");
const { sequelizeMsSQL ,QueryTypes } = require("../../db/database");
const { DataTypes } = Sequelize;

// * Modelo de creacion de la tabla en lgecb_bi apuntando a la tabla que contiene los datos a graficar
const dataGrafMssql = "GRAFICA_CPSI_SO_WOS_AMT_TOTAL_PRUEBA_PARA_PROBAR";
// recibe 3 argumentos:
//1 el nombre del modelo o tabla,
//2 atributos
//3 opciones
const modeloGraficaMsSQL = sequelizeMsSQL.define(
  dataGrafMssql,
  {
    CHANNEL: {
      type: DataTypes.STRING,
      //primaryKey: true,
      //autoIncrement: true,
      allowNull: false,
    },
    ABRAVATION: {
      type: DataTypes.STRING,
      //autoIncrement: true,
      allowNull: false,
    },
    APPROVED_REFERENCE: {
      type: DataTypes.STRING,
      //autoIncrement: true,
      allowNull: false,
    },
    CATEGORY: {
      type: DataTypes.STRING,
      //autoIncrement: true,
      allowNull: false,
    },
    SUB_CATEGORY: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LINE: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    QTY: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    WEEK_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LINE_TG: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "SUM_QTY_W-4": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SUM_QTY_W+8": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ID: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    //la tabla se llama igual al nombre que se definio arriba
    freezeTableName: true,
    // evita la creacion de las columnas createdAt y updateAt
    timestamps: false,
  }
);
//Remueve el campo "ID" que sequelize genera por defecto
modeloGraficaMsSQL.removeAttribute("id");



module.exports = {
  dataInfoMsSQL,
}
