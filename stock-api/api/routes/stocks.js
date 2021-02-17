const express = require("express")
const router = express.Router()
const stockController = require("../controllers/stocks")

router.get('/', stockController.getStockData)

module.exports = router