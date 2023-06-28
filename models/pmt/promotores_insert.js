const { modelopmtvariablesMysqladd  } = require("./pmt_variables")
const { modelopmtothersMysqladd  } = require("./pmt_others_reg")
const { modelopmtheadcountpptoMysqladd  } = require("./pmt_headcount")
const { modelopmtpaymentMysqladd  } = require("./pmt_payment")

async function dataptmexpensespptoinsertgMySQL( valores = {} ) {
  try {
    
    const {variables, other, headcount, payment } = valores
    
    if(!variables || !other || !headcount || !payment){
      throw new Error('campos requerdios headcount, variables, payment')
      return
    }

    const datapayment = await modelopmtpaymentMysqladd.bulkCreate( 
      JSON.parse(payment)   
    );

    const dataheadcount = await modelopmtheadcountpptoMysqladd.bulkCreate( 
      JSON.parse(headcount)   
    );

    const dataother = await modelopmtothersMysqladd.bulkCreate( 
      JSON.parse(other)  
    );

    const datavariables = await modelopmtvariablesMysqladd.bulkCreate( 
      JSON.parse(variables)  
    );

    return {
      datavariables,
      dataother,
      dataheadcount,
      datapayment,
    }

  } catch (err) {
    throw new Error(err.message || err.stack || 'Error no identificado' )
  }
}

module.exports = {
  dataptmexpensespptoinsertgMySQL,
};