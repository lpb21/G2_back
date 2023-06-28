const {
  dataChannelMsSQL,
  dataARMsSQL,
  dataInfoGeneralMsSQL,
  dataDealerMsSQL,
  dataPGMsSQL,
  dataPG2MsSQL,
  dataPG_ToolMsSQL,
  dataStatusMsSQL,
  dataYearBI,
  dataKMMsSQL,
  dataRegionalMsSQL,
  dataMajorCostMsSQL
} = require("../../models/bi/gralModelsFiltersBI");

const channel = async (req, res) => {
  try {
    const resultBiChannel = await dataChannelMsSQL();
    return res.send(resultBiChannel);
  } catch (err) {
    res.status(400).send({
      mns: err.message,
    });
  }
};

const AR = async (req, res) => {
  try {
    const resultAR = await dataARMsSQL(req.query);
    res.send(resultAR);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
};

const wos = async (req, res) => {
  try {
    const filtros = req.body;
    const resultBi = await dataInfoGeneralMsSQL(filtros);
    return res.send(resultBi);
  } catch (err) {
    res.status(400).send({
      mns: err.message,
    });
  }
};

const dealer = async (req, res) => {
  try {
    const resultBiDealer = await dataDealerMsSQL(req.query);
    res.send(resultBiDealer);
  } catch (err) {
    res.status(400).send({
      mns: err.message,
    });
  }
};

const pg = async (req, res) => {
  try {
    const resultBiPG = await dataPGMsSQL(req.query);
    res.send(resultBiPG);
  } catch (err) {
    res.status(400).send({
      mns: err.message,
    });
  }
};

const pg2 = async (req, res) => {
  try {
    const resultBiPG2 = await dataPG2MsSQL(req.query);
    res.send(resultBiPG2);
  } catch (error) {
    res.status(400).send({
      mns: err.message,
    });
  }
};

const pg_tool = async (req, res) => {
  try {
    const resultBiPG_Tool = await dataPG_ToolMsSQL(req.body);
    res.send(resultBiPG_Tool);
  } catch (err) {
    res.status(400).send({
      mns: err.message,
    });
  }
};

const status = async (req, res) => {
  try {
    const resultBiStatus = await dataStatusMsSQL(req.body);
    res.send(resultBiStatus);
  } catch (err) {
    res.status(400).send({
      mns: err.message,
    });
  }
};

const yearBI = async (req, res) => {
  try {
    const resultBiYear = await dataYearBI();
    return res.send(resultBiYear);
  } catch (err) {
    throw err;
  }
};

const key_models = async (req, res) => {
  try {
    const resultKM = await dataKMMsSQL(req.body);
    res.send(resultKM);
  } catch (err) {
    res.status(400).send({
      mns: err.message,
    });
  }
};

const regionalBI = async (req, res) => {
  try {
    const resultBiRegional = await dataRegionalMsSQL(req.query);
    
    res.send(resultBiRegional);
  } catch (err) {
    res.status(400).send({
      mns: err.message,
    });
  }
};

const majorCostumerBI = async (req, res) => {
  try {
    const resultBiMajorCost = await dataMajorCostMsSQL(req.query);
    
    res.send(resultBiMajorCost);
  } catch (err) {
    res.status(400).send({
      mns: err.message,
    });
  }
};


module.exports = {
  channel,
  AR,
  wos,
  dealer,
  pg,
  pg2,
  pg_tool,
  status,
  yearBI,
  key_models,
  regionalBI,
  majorCostumerBI
};
