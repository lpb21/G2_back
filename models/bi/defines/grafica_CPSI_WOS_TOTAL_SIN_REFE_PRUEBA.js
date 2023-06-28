const Sequelize = require("sequelize");
const { sequelizeMsSQL } = require ("../../../db/database")
const { DataTypes } = Sequelize;

// * Modelo de creacion de la tabla en lgecb_bi apuntando a la tabla que contiene los datos a graficar
const modeloTabla = "grafica_CPSI_WOS_TOTAL_SIN_REFE_PRUEBA";
// recibe 3 argumentos:
//1 el nombre del modelo o tabla,
//2 atributos
//3 opciones
const grafica_CPSI_WOS_TOTAL_SIN_REFE_PRUEBA = sequelizeMsSQL.define(
    modeloTabla,
  {
    CATEGORY: {
      type: DataTypes.STRING,
      //autoIncrement: true,
      allowNull: false,
    },
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
      FLOORING_21: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FLOORING_22: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FOCO: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      I_SELL_21: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      I_SELL_22: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      I_SELL_22_N: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      ID_TIEMPO: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      "INV_21_W-1": {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      "INV_22_W-1": {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      INV_SELL_AMT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      KEY_MODELS: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MES: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PG: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PG_TOOL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PG2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      REGIONAL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SI_K: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SI_P: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SI_Y1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SO: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SO_21_W_4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      "SO_21_W+8": {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SO_22: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SO_22_W_4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      "SO_22_W+8": {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SO_AMT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SO_AMT_COP: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      "SO_AMT_W+8": {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      "SO_AMT_W-4": {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SO_FCTS_W1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      "SO_Y-1": {
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
      SUB_CATEGORY: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      WEEK_1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      WEEK_TIPO: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      YEAR_1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
  },
  {
    //la tabla se llama igual al nombre que se definio arriba
    freezeTableName: true,
    // evita la creacion de las columnas createdAt y updateAt
    timestamps: false,
  }
);
//Remueve el campo "ID" que sequelize genera por defecto
grafica_CPSI_WOS_TOTAL_SIN_REFE_PRUEBA.removeAttribute("id");



module.exports = {
    grafica_CPSI_WOS_TOTAL_SIN_REFE_PRUEBA,
}
