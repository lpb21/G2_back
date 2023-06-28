const Sequelize = require("sequelize");
const { sequelizeMysql } = require("../../db/database");
const { DataTypes } = Sequelize;

// * Modelo de creacion de la tabla en lgecb_bi apuntando a la tabla que contiene los datos a graficar
// recibe 3 argumentos:
//1 el nombre del modelo o tabla,
//2 atributos
//3 opciones
const modelUserOTPMySQL = sequelizeMysql.define(
  "user_otp_tmp",
  {
    otp_req_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      //autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      //autoIncrement: true,
      allowNull: false,
    },
    stampini: {
      type: DataTypes.DATEONLY,
      //autoIncrement: true,
      allowNull: false,
    },
    stampfin: {
      type: DataTypes.DATEONLY,
      //autoIncrement: true,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.CHAR,
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
modelUserOTPMySQL.removeAttribute("id");

// *Consultando datos de la tabla con el modelo anterior (lgecb)
async function dataUserOTPMySQL() {
  try {
    const resultusersOTPMysql = await modelUserOTPMySQL.findAll({where: {user_id : '7783'}});
    //Recorre los elementos de lo que me genera la busqueda
     //resultusersOTPMysql.forEach(element => {
         //console.log(resultusersOTPMysql);
     //});   
    return resultusersOTPMysql
  } catch (err) {
    throw err
  }
  
}
