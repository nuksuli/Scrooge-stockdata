import React, { useEffect, useState } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Calendar from 'react-calendar'
import moment from 'moment'
import "react-calendar/dist/Calendar.css"
import Axios from 'axios'
import { readString } from 'react-papaparse'

const useStyles = makeStyles(() => ({
    root: {
        display: 'inline-block',
        backgroundColor: 'white',
        textAlign: 'center',
        padding: "1%",
        border: "2px solid black",
    },
    input: {
        marginTop: "2%",
        width: '40%'
    },
    button: {
        margin: 'auto',
        width: '40%'
    }
}))
export const LeftCol = () => {
    const classes = useStyles();
    const [company, setCompany] = useState('Apple')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [stockData, setStockData] = useState("")
    useEffect(() => {
        if (startDate && endDate) {
            getStockData()
        }
    }, [endDate, company])
    const getStockData = async () => {
        try {
            //getting 5 days before for SMA
            const fixedStartDate = moment(startDate).subtract(moment.duration({ 'days': 5 })).toDate()
            const response = await Axios({
                method: "get",
                url: `http://localhost:8000/stocks?startYear=${fixedStartDate.getFullYear()}&startMonth=${fixedStartDate.getMonth() + 1}&startDay=${fixedStartDate.getDate()}&endYear=${endDate.getFullYear()}&endMonth=${endDate.getMonth() + 1}&endDay=${endDate.getDate()}`
            })
            if (response.status === 200) {
                const responseData = response.data
                const results = readString(responseData.data, { header: true })
                setStockData(results.data)
                console.log(stockData)
            }
            else {
                console.log(response)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleDateChange = (date) => {
        setStartDate(date[0])
        setEndDate(date[1])
    }
    return (
        <div className={classes.root}>
            <form>
                <Calendar
                    className="react-calendar"
                    maxDate={moment().toDate()}
                    activeStartDate={moment().startOf('isoWeek').toDate()}
                    selectRange
                    onChange={handleDateChange}
                />
                <TextField
                    className={classes.input}
                    label="Select company"
                    select
                    value={company}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option>
                        AAPL
                    </option>
                </TextField>
            </form>
        </div>
    )
}