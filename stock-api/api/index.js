const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT

const stocks = require("./routes/stocks")

app.use(morgan("dev"))
app.use(cors())

app.use("/stocks", stocks)

const server = require("http").createServer(app)
server.listen(port, function () {
    console.log(`Listening on ${port}`);
})