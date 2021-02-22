import React, { useEffect, useState } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Calendar from 'react-calendar'
import "react-calendar/dist/Calendar.css"
import Axios from 'axios'
import { readString } from 'react-papaparse'
import * as UTILS from './utils';
import moment from "moment-business-days"
import InfoBox from "./InfoBox"
import { Sma5 } from './Sma5';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    calendar: {
        backgroundColor: 'white',
        textAlign: 'center',
        padding: "1%"
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
export const Content = () => {
    const classes = useStyles();
    const [company, setCompany] = useState('Apple')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [stockData, setStockData] = useState([])
    const [isMount, setIsMount] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (startDate && endDate && !isMount) {
            getStockData()
        }
        else {
            setIsMount(false)
        }
    }, [endDate, company])


    const getStockData = async () => {
        setLoading(true)
        try {
            //getting 5 days before for SMA5
            const fixedStartDate = moment(startDate).businessSubtract(5).toDate()
            const response = await Axios({
                method: "get",
                url: `http://localhost:8000/stocks?startYear=${fixedStartDate.getFullYear()}&startMonth=${fixedStartDate.getMonth() + 1}&startDay=${fixedStartDate.getDate()}&endYear=${endDate.getFullYear()}&endMonth=${endDate.getMonth() + 1}&endDay=${endDate.getDate()}`
            })
            if (response.status === 200) {
                const responseData = response.data
                const results = await readString(responseData.data)
                setStockData(results.data)
            }
            else {
                console.log(response)
            }
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }


    const handleDateChange = (date) => {
        setStartDate(date[0])
        setEndDate(date[1])
    }

    return (
        <div className={classes.root}>
            <div className={classes.calendar}>
                <form>
                    <Calendar
                        className="react-calendar"
                        maxDate={moment().toDate()}
                        defaultActiveStartDate={moment().startOf('isoWeek').toDate()}
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
                <Sma5
                    loading={loading}
                    sma5Array={UTILS.getSma5({ stockData })}
                >

                </Sma5>
            </div>
            <InfoBox
                streakArray={UTILS.getLongestStreak({ stockData })}
                loading={loading}
                orderedArray={UTILS.getOrderedArray({ stockData })}
            />
        </div>
    )
}