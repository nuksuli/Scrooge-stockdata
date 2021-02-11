import React from 'react';
import { Button, makeStyles, Input } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        width: '20%',
        backgroundColor: 'white',
        textAlign: 'center',
        padding: "1%",
        border: "2px solid black",
    },
    input: {
        marginTop: "2%"
    },
    button: {
        marginTop: '2%'
    }
}))
export const LeftCol = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <form>
                <Input />
                <Input />
                <Button className={classes.button}>
                    FetchData
            </Button>
            </form>
        </div>
    )
}