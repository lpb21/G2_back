const { DataTypes } = require("sequelize");
const { sequelizeMysql } = require("../../db/database");

const datapmtheadcountMysql = "pmt_headcount";

const modelopmtheadcountpptoMysqladd = sequelizeMysql.define(
  datapmtheadcountMysql,
  {
    period: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    identification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    canal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cadena: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    almacen: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    spv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fching: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    val_reg: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    
    timestamps: false,
  }
);

modelopmtheadcountpptoMysqladd.removeAttribute("id");

async function datapmtheadcountpptoMysql() {
  try {
    const data = await modelopmtheadcountpptoMysqladd();
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  datapmtheadcountpptoMysql,
  modelopmtheadcountpptoMysqladd
};
