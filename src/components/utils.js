/**
 * 
 * @module UTILS
 * @description Helper functions
 * 
 * 
 */


export const getLongestStreak = ({ stockData }) => {
    var i,
        dataArray = [3],
        streak,
        highestStreak = 0
    if (stockData.length === 0) {
        return ""
    }
    var length = stockData.length,
        startPoint = length - 7
    for (i = startPoint; i > 0; i--) {
        if (parseFloat(stockData[i][1].substring(2)) > parseFloat(stockData[i + 1][1].substring(2))) {
            streak++
        }
        else {
            streak = 0;
        }
        if (streak > highestStreak) {
            //ending date
            dataArray[0] = stockData[i]
            //start date
            dataArray[1] = stockData[i + streak]
            dataArray[2] = streak
            highestStreak = streak
        }
    }

    return dataArray
}

export const getOrderedArray = ({ stockData }) => {
    if (stockData.length <= 1) {
        return stockData
    }
    const actualArray = stockData.slice(1, stockData.length - 6)

    actualArray.forEach(element => {
        element.push(
            Math.abs(Number(element[4].substring(2)) - Number(element[5].substring(2))).toFixed(2)
        )
    });

    //Simple mergesort
    const mergeSort = (unsortedArray) => {
        if (unsortedArray.length <= 1) {
            return unsortedArray
        }

        const mid = Math.floor(unsortedArray.length / 2)
        const right = unsortedArray.slice(0, mid)
        const left = unsortedArray.slice(mid)

        return merge(mergeSort(left), mergeSort(right))
    }

    const merge = (left, right) => {
        let sortedArray = [], leftIndex = 0, rightIndex = 0
        while (leftIndex < left.length && rightIndex < right.length) {
            if (parseInt(left[leftIndex][2].substring(1)) > parseInt(right[rightIndex][2].substring(1))) {
                sortedArray.push(left[leftIndex])
                leftIndex++
            }
            else if (parseInt(left[leftIndex][2].substring(1)) === parseInt(right[rightIndex][2].substring(1))) {
                if (parseFloat(left[leftIndex][6]) > parseFloat(right[rightIndex][6])) {
                    sortedArray.push(left[leftIndex])
                    leftIndex++
                }
                else {
                    sortedArray.push(right[rightIndex])
                    rightIndex++
                }
            }
            else {
                sortedArray.push(right[rightIndex])
                rightIndex++
            }
        }
        return sortedArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
    }
    return mergeSort(actualArray)
}
