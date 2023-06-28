require("dotenv").config();

module.exports.Config = {
  port: process.env.PORT,
  SIGN_LG: process.env.SIGN_LG,

  //* Variables Mysql
  mysql_db: process.env.MYSQL_DB_NAME,
  mysql_usr: process.env.MYSQL_DB_USER,
  mysql_pass: process.env.MYSQL_DB_PASSWORD,
  mysql_host: process.env.MYSQL_DB_HOST,
  mysql_port: process.env.MYSQL_DB_PORT,
  mysql_dialect: process.env.MYSQL_DB_DIALECT,

//* Variables SQL Server
  mssql_host: process.env.MSSQL_DB_HOST,
  mssql_dialect: process.env.MSSQL_DB_DIALECT,
  mssql_db: process.env.MSSQL_DB_NAME,
  mssql_usr_adm: process.env.MSSQL_DB_USER_ADM,
  mssql_pass_adm: process.env.MSSQL_DB_PASS_ADM,

  
  mssql_usr: process.env.MSSQL_DB_USER,
  mssql_pass: process.env.MSSQL_DB_PASS,

   //* Variables Mysql external
   mysql_ext_db: process.env.MYSQL_EXT_DB_NAME,
   mysql_ext_usr: process.env.MYSQL_EXT_DB_USER,
   mysql_ext_pass: process.env.MYSQL_EXT_DB_PASSWORD,
   mysql_ext_host: process.env.MYSQL_EXT_DB_HOST,
   mysql_ext_port: process.env.MYSQL_EXT_DB_PORT,
   mysql_ext_dialect: process.env.MYSQL_EXT_DB_DIALECT,
  

};

