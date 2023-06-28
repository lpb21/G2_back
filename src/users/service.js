//const {ObjectId} = require("");
//const { sequelizeMysql } = require("../db/database");
const { dataUserTableMySQL } = require("../../models/findUserMysql");

const getAll= async()=>{
    await  dataUserTableMySQL();
}

module.exports = {
    getAll
  };