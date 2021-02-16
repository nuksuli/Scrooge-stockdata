import React, { useState } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Calendar from 'react-calendar'
import moment from 'moment'
import "react-calendar/dist/Calendar.css"

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