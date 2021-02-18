const request = require('request')
const UTILS = require("../utils")

module.exports = {
    getStockData: async (req, res) => {
        console.log(req.query)
        let startYear = req.query.startYear
        let startMonth = req.query.startMonth
        let startDay = req.query.startDay
        let endYear = req.query.endYear
        let endMonth = req.query.endMonth
        let endDay = req.query.endDay

        console.log(startDay, startMonth, startYear, endYear, endMonth, endDay)
        const parsedDates = UTILS.parseDate(startYear, startMonth, startDay, endYear, endMonth, endDay)
        console.log(`https://www.nasdaq.com/api/v1/historical/AAPL/stocks/${parsedDates.start.year}-${parsedDates.start.month}-${parsedDates.start.day}/${parsedDates.end.year}-${parsedDates.end.month}-${parsedDates.end.day}`)
        try {

            request({
                uri: `https://www.nasdaq.com/api/v1/historical/AAPL/stocks/${parsedDates.start.year}-${parsedDates.start.month}-${parsedDates.start.day}/${parsedDates.end.year}-${parsedDates.end.month}-${parsedDates.end.day}`,
                method: 'GET',
                headers: {
                    'Accept': 'application/csv',
                    'Accept-Encoding': 'deflate',
                    'Connection': 'keep-alive',
                    'User-Agent': 'Script'
                }
            },
                function (error, response, body) {
                    console.log(body)
                    if (body === "\n") {
                        res.status(502).json({
                            message: "Failed to fetch the data"
                        })
                    }
                    else {
                        res.status(200).json({ data: body })
                    }
                })
        }
        catch (err) {
            console.log(err)
        }


    }
}