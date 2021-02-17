const express = require("express")
const router = express.Router()
const stockController = require("../controllers/stocks")
const cors = require("cors")



router.get('/', cors(), stockController.getStockData)

module.exports = router