module.exports = {
    parseDate: (startYear, startMonth, startDay, endYear, endMonth, endDay) => {
        let sy = startYear
        let sm = startMonth
        let sd = startDay
        let ey = endYear
        let em = endMonth
        let ed = endDay
        if (startDay < 10) {
            sd = "0" + startDay
        }
        if (endDay < 10) {
            ed = "0" + endDay
        }
        if (startMonth < 10) {
            sm = "0" + startMonth
        }
        if (endMonth < 10) {
            em = "0" + endMonth
        }
        return {
            start: {
                year: sy,
                month: sm,
                day: sd
            },
            end: {
                year: ey,
                month: em,
                day: ed
            }
        }

    }
}