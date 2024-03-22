const express = require('express')
const router = express.Router()
const salesforceService = require('../services/salesforceService')

router.get('/',salesforceService.getExpenses)


module.exports = router;