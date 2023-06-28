const { DataTypes } = require("sequelize");
const { sequelizeMsSQL } = require("../../db/database");

/* // ! Modelo de creacion de la tabla en lgecb_bi 
 ! en donde estan TODOS los campos
*/
const tablaGeneral = "GRAFICA_CPSI_WOS_TOTAL_PRUEBA";
// recibe 3 argumentos:
//1 el nombre del modelo o tabla,
//2 atributos
//3 opciones
const modeloGeneral = sequelizeMsSQL.define(
  tablaGeneral,
  {
    CHANNEL: {
      type: DataTypes.STRING,
      //primaryKey: true,
      //autoIncrement: true,
      allowNull: false,
    },
    DEALER: {
      type: DataTypes.STRING,
      //primaryKey: true,
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
    KEY_MODELS: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PG: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PG2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PG_TOOL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    WEEK_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID_TIEMPO: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    MES: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    WEEK_TIPO: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    STATUS: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SO: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_Y-1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_SELL_22": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "FLOORING_22": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_SELL_21": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    FLOORING_21: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SI_P: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SI_K: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SI_Y1: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SO_FCTS_W1: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W+8": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_21_W+8": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SO_21_W_4: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SO_22_W_4: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "INV_22_W-1": {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    "INV_21_W-1": {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    "SO_AMT_W-4": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_AMT_W+8": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    INV_SELL_AMT: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_Y-1_AMT": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_Y-1_AMT_COP": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    MODEL_SUFFIX: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    YEAR_1: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    I_SELL_22_N: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W+7": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W+6": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W+5": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W+4": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W+3": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W+2": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W+1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W-1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W-2": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W-3": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SO_ACOMULADO: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SO_FCST_MES: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    NRO_MES: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_22_W+8_": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W+8_": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W+7": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W+6": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W+5": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W+4": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W+3": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W+2": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W+1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W-3": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W-2": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "I_22_W-1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W+8_": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W+7": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W+6": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W+5": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W+4": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W+3": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W+2": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W+1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W-3": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W-2": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SI_22_W-1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W+8_": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W+7": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W+6": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W+5": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W+4": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W+3": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W+2": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W+1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W-3": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W-2": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_FCST_22_W-1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W+8_": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W+7": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W+6": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W+5": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W+4": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W+3": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W+2": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W+1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W+1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W-3": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W-2": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SO_SUM_22_W-1": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SFA_23": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "SFA_22": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    //la tabla se llama igual al nombre que se definio arriba
    freezeTableName: true,
    // evita la creacion de las columnas createdAt y updateAt
    timestamps: false,
    id: false
  }
);
//Remueve el campo "ID" que sequelize genera por defecto
modeloGeneral.removeAttribute("id");

module.exports = {
  modeloGeneral,
};
