const {modeloGeneral} =require ("./tablaGRAFICA_CPSI_WOS_TOTAL_PRUEBA")
const { QueryTypes } = require('sequelize');


/* // *Consultando datos de la tabla con el modelo de la tabla GRAFICA_CPSI_WOS_TOTAL_PRUEBA
    * y se ejcuta el procedimiento almacenado llamado retornosWeekdata
*/
async function dataWeekMsSQL() {
    try {
    const sequelize = modeloGeneral.sequelize;
        const data = await sequelize.query('EXEC retornosWeekdata', {
            type: QueryTypes.SELECT
          })
          return {
            data
          };
        }catch(err){
          console.log(err.message);
          return {
            error: err.message,
          };
        }
    }
    
  module.exports = {
    dataWeekMsSQL,
  };