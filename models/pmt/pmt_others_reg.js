const { DataTypes } = require("sequelize");
const { sequelizeMysql } = require("../../db/database");

const datapmtothersMysql = "pmt_others_reg";

const modelopmtothersMysqladd = sequelizeMysql.define(
  datapmtothersMysql,
  {
    period: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    other_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    idfile: {
      type: DataTypes.BIGINT,
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
modelopmtothersMysqladd.removeAttribute("id");

async function datapmtothersregMysql() {
  try {
    const data = await modelopmtothersMysqladd();
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  datapmtothersregMysql,
  modelopmtothersMysqladd
};
