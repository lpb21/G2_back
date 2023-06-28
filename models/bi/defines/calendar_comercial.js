const Sequelize = require("sequelize");
const { sequelizeMsSQL } = require ("../../../db/database")
const { DataTypes } = Sequelize;

// * Modelo de creacion de la tabla en lgecb_bi apuntando a la tabla que contiene los datos a graficar
const modeloTabla = "CALENDARIO_COMERCIAL";
// recibe 3 argumentos:
//1 el nombre del modelo o tabla,
//2 atributos
//3 opciones
const calendario_comercial = sequelizeMsSQL.define(
    modeloTabla,
    {
    ID: {
      type: DataTypes.INTEGER,
      //autoIncrement: true,
      allowNull: false,
    },
    CHANNEL: {
        type: DataTypes.STRING,
        //primaryKey: true,
        //autoIncrement: true,
        allowNull: false,
    },
    REGIONAL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DEALER: {
      type: DataTypes.STRING,
      //primaryKey: true,
      //autoIncrement: true,
      allowNull: false,
    },
    YEAR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WEEK_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PLAN: {
      type: DataTypes.INTEGER,
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



module.exports = {
  calendario_comercial
}
