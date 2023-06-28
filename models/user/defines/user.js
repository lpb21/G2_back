const Sequelize = require("sequelize");
const {DataTypes} = Sequelize;
const {sequelizeMysql} = require("../../../db/database");

// * Modelo de creacion de la tabla en lgecb
  // recibe 3 argumentos:
    //1 el nombre del modelo o tabla,
    //2 atributos
    //3 opciones
const ModeloTablaUserGTM2 = sequelizeMysql.define ("user", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identification: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    //unique: true
  },
},
{
  //la tabla se llama igual al nombre que se definio arriba
  freezeTableName: true,
  // evita la creacion de las columnas createdAt y updateAt
  timestamps:false
});


// *aqui se guarda la tabla creada
//console.log(sequelizeMysql.models.tabla1);

// crea la tabla con el metodo sync()
async function crearTablauserGTM2 () {
  /*force in the table creation
  await createTabletabla1.sync({ force: true })
  Altera la tabla para que coincida con nuestro modelo
  await createTabletabla1.sync({ alter: true })*/
  try {
      // await ModeloTablaUserGTM2.sync ();
  }catch (err) {
      throw err
  }    
}

//crearTablauserGTM2();
module.exports = {
  ModeloTablaUserGTM2,
  crearTablauserGTM2
}