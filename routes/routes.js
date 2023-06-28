const express = require('express')
const { body } = require('express-validator')
const multer = require('multer')
const router = express.Router()
const upload = multer()
// Express validator

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})



const uploadConfig = multer({ storage : storage})
const { 
    wos, 
    getUsers, 
    channel,
    dealer,
    getDatosVela,
    getlistFiles,
    setcreateFolder,
    managerFilesEvidencias,
    pg,
    pg_tool,
    pg2,
    status,
    AR,
    key_models,
    headerMenu,
    week,
    filtros,
    yearBI,
    deleteFile,
    measureGeneral,
    tableCpsiGral,
    tableCpsiGral2,
    tableCpsiView,
    tableMeasureGral2,
    promotores,
    regionalBI,
    majorCostumerBI,
    uploadServer,
    otpUser,
    tableCpsiWhithOutDealer,
    calendarComercial
} = require('../controllers')

// middleware.

const { sign, verifyToken, headerVerifyToken } = require("../middleware/auth-jwt")

router.post('/managerFilesEvidencias', [headerVerifyToken , verifyToken, upload.any(), managerFilesEvidencias] )
router.post('/uploadServer', [headerVerifyToken , verifyToken, uploadConfig.any(), uploadServer])
router.post('/createFolder', [headerVerifyToken , verifyToken, setcreateFolder])
router.post('/addpromotores',promotores)
router.post('/getUsers',
    body('username').trim().notEmpty(),
    body('password').trim().notEmpty(),
    body('otp').trim().notEmpty()
  ,getUsers
)

router.get('/listfilesDrive', getlistFiles)
router.get('/token', sign)
router.get('/verifyToken', [headerVerifyToken , verifyToken])

router.get('/getDatosVela', getDatosVela)
router.get('/getChannel', channel)
router.get('/getDealer',dealer)
//router.get('/getAllinfo',wos)
router.get('/getPG',pg)
router.get('/getPG_Tool',pg_tool)
router.get('/getPG2',pg2)
router.get('/getStatus',status)
router.get('/getAR',AR)
router.get('/getKM',key_models)
router.get('/getMenuHeader', headerMenu)
router.get('/getWeekData', week)
router.get('/getDataWithFilters', filtros)
router.get('/getMeasureGeneral', measureGeneral)
router.get('/getYearBI', yearBI)
router.get('/getRegional', regionalBI)
router.get('/getMajorCostumer', majorCostumerBI)
router.get('/getTableCPSI', tableCpsiGral)
router.get('/getTablaNewCPSI', tableCpsiGral2)
router.get('/getTablaNewCPSIView', tableCpsiView)

router.get('/getMeasureGeneral2', tableMeasureGral2)
router.get('/getTablaCPSIWhitOutDealer', tableCpsiWhithOutDealer)
router.get('/calendarComercial', calendarComercial)
router.get('/validateOtp', otpUser) // Valida Otp por usuario
// Delete.
router.delete('/deleteFileDrive', deleteFile)

module.exports = router