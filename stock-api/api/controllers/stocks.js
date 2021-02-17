const request = require('request')
const UTILS = require("../utils")

module.exports = {
    getStockData: async (req, res) => {
        console.log("test")
        const data = request({
            uri: 'https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20',
            method: 'GET',
            headers: {
                'Accept': 'application/csv',
                'Accept-Encoding': 'deflate',
                'Connection': 'keep-alive',
                'User-Agent': 'Script'
            }
        },
            function (error, response, body) {
                const json = UTILS.csvToJson(body)
                console.log(json)
                res.status(200).json({
                    data: body
                }
                )
            })


    }
}