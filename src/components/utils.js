/**
 * 
 * @module UTILS
 * @description Helper functions
 * 
 * 
 */


export const getLongestStreak = ({ stockData }) => {
    console.log(stockData)
    var i,
        dataArray = [3],
        streak,
        highestStreak = 0
    if (stockData.length === 0) {
        return ""
    }
    var length = stockData.length,
        startPoint = length - 7,
        startDate = stockData[startPoint]
    for (i = startPoint; i > 0; i--) {
        if (parseFloat(stockData[i][1].substring(2)) > parseFloat(stockData[i + 1][1].substring(2))) {
            streak++
        }
        else {
            streak = 0;
        }
        if (streak > highestStreak) {
            dataArray[0] = stockData[i]
            dataArray[1] = stockData[i + streak]
            dataArray[2] = streak
            highestStreak = streak
        }
    }
    console.log(dataArray)
    return dataArray
}
