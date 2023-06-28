const Sequelize = require("sequelize");
const { sequelizeMysql } = require("../../../db/database");
const { DataTypes } = Sequelize;

// * Modelo de creacion de la tabla en lgecb_bi apuntando a la tabla que contiene los datos a graficar
// recibe 3 argumentos:
//1 el nombre del modelo o tabla,
//2 atributos
//3 opciones
const modelUserTableMySQL = sequelizeMysql.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      //autoIncrement: true,
      allowNull: false,
    },
    employee_type_id: {
      type: DataTypes.INTEGER,
      //autoIncrement: true,
      allowNull: false,
    },
    identification: {
      type: DataTypes.STRING,
      //autoIncrement: true,
      allowNull: false,
    },
    identification_type: {
      type: DataTypes.STRING,
      //autoIncrement: true,
      allowNull: false,
    },
    employee_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.BLOB("tiny"),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    old_reference_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    need_password_change: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login_tries: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ip_origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
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
modelUserTableMySQL.removeAttribute("id");

// *Consultando datos de la tabla con el modelo anterior (lgecb)
async function dataUserTableMySQL() {
  try {
    
    const resultusersTableMysql = await modelUserTableMySQL.findAll({
        where: {status : 'A'}
    })
    //Recorre los elementos de lo que me genera la busqueda
    return resultusersTableMysql
  } catch (err) {
    throw err
  }
  
}

module.exports = {
  dataUserTableMySQL,
  modelUserTableMySQL
}

