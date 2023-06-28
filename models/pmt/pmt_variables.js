const { DataTypes } = require("sequelize");
const { sequelizeMysql } = require("../../db/database");

const datapmtexpensesMysql = "pmt_variables";

const modelopmtvariablesMysqladd = sequelizeMysql.define(
  datapmtexpensesMysql,
  {
    period: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    identification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variable: {
      type: DataTypes.DECIMAL,
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

modelopmtvariablesMysqladd.removeAttribute("id");

async function datapmtvariablesMysql() {
  try {
    const data = await modelopmtvariablesMysqladd();
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  datapmtvariablesMysql,
  modelopmtvariablesMysqladd
};
