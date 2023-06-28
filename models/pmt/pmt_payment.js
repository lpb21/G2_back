const { DataTypes } = require("sequelize");
const { sequelizeMysql } = require("../../db/database");

const datapmtheadcountMysql = "pmt_payment";

const modelopmtpaymentMysqladd = sequelizeMysql.define(
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
    fching: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fchret: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    category: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    position: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    dayslab: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    salary_final: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    aux_trans: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    retro_ascen: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    tot_sal_aux_retro: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    bono_cumpleanos: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    pc_renting: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    dotacion: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    movilizacion: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    movilizacion_ant: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    aux_com_aracne: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    aux_com: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    aux_com_ant: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    aux_com_aju: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    aux_funerario: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    aux_calamidad: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    reem_papeleria: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    reem_taxi_bus: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    reem_alimentacion: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    reem_refrigerio: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    indemnizacion: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    tot_no_salary: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    hedo: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    hedo_val: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    heno: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    hrn: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    hrn_val: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    hrdc: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    hrdc_val: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    hrdnc: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    hrdnc_val: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    total_he: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    variable: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    days_incapacidad: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    val_incapacidad: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    incapacidad_eps_days: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    incapacidad_eps_val: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    incapacidad_emp_days: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    incapacidad_emp_val: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    days_licencia: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    val_licencia: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    val_luto: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    ibc: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    cesantias: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    int_cesantias: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    prima: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    vacaciones: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    tot_prestanciones: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    base_paraf_ss: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    base_paraf_ss_2: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    salud: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    pension: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    arl: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    caja: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    icbf: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    sena: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    tot_paraf_ss: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    cost_ing: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    val_ant_leg: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    holidays_adent: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    fee6: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    fee8: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    recuperables: {
      type: DataTypes.DECIMAL(11, 10),
      allowNull: false,
    },
    tot_final: {
      type: DataTypes.DECIMAL(11, 10),
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

modelopmtpaymentMysqladd.removeAttribute("id");

async function datapmtpaymentMysql() {
  try {
    const data = await modelopmtpaymentMysqladd();
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  datapmtpaymentMysql,
  modelopmtpaymentMysqladd
};
