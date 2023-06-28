const { config } = require("dotenv");
const { Sequelize, QueryTypes } = require("sequelize");
const tedious = require("tedious");
const { Config } = require("../src/config/index")

// *Conexion a BD Mysql
const sequelizeMysql = new Sequelize(
  Config.mysql_db,
  Config.mysql_usr,
  Config.mysql_pass,
  {
    host: Config.mysql_host,
    port: Config.mysql_port,
    //port: 3306,
    dialect: Config.mysql_dialect
  }
);

const sequelizeMysqlexternal = new Sequelize(
  Config.mysql_ext_db, 
  Config.mysql_ext_usr,
  Config.mysql_ext_pass,
  {
    host: Config.mysql_ext_host,
    port: Config.mysql_ext_port,
    // port: 3306,
    dialect: Config.mysql_ext_dialect
  } 
);

// * con async y await
/*async function MysqlAuthent(){
  try{
await sequelizeMysql.authenticate();
console.log('conexion exitosa con Mysql!!')
}catch(error){
  console.log(error);
}}
MysqlAuthent();*/

// * Verificacion de la autenticacion la cual me devuelve una promesa
/*
sequelizeMysql.authenticate()
.then(()=>{
    console.log('conexion exitosa con Mysql');
})
.catch(error=>{
    console.log('error de conexion a Mysql : ',error);
*/
// *Conexion a BD MsSQL
const sequelizeMsSQL = new Sequelize (Config.mssql_db, Config.mssql_usr_adm, Config.mssql_pass_adm, {
  host: Config.mssql_host,
  dialect: Config.mssql_dialect,
  dialectModule: tedious,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 20000,
  },
  dialectOptions: {
    connectTimeout: 60000, // Tiempo de espera en milisegundos
  },
});

// * Verificacion de la autenticacion con MsSQL
 /*async function mssql() {
  try {
    await sequelizeMsSQL.authenticate();
    console.log("conexion exitosa con mssql");
  } catch (error) {
    console.log(error);
  }
  console.log(sequelizeMsSQL.host)
}
mssql();*/

module.exports = { sequelizeMysql, Sequelize, sequelizeMsSQL, sequelizeMysqlexternal};
