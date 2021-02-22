import { Card, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core"
import ReactLoading from 'react-loading'
const useStyles = makeStyles(() => ({
    root: {
        display: 'table-cell',
        height: '100%',
        width: '100%'
    },
    loading: {
        margin: '5% auto auto auto'
    }
}))
const InfoBox = ({ streakArray, loading, orderedArray }) => {
    let renderInfoBox = null
    let renderArrayBox = null
    const classes = useStyles()
    console.log(orderedArray)
    if (loading) {
        renderArrayBox = null
    }
    else if (!orderedArray) {
        renderArrayBox = null
    }
    else {
        renderArrayBox = (
            <Card>
                <CardHeader>Ordered list (date, volume, price change)</CardHeader>
                {orderedArray.map(d => (
                    <CardContent>
                        {d[0]} volume: {d[2]} change: {d[6]}
                    </CardContent>
                ))}
            </Card>
        )
    }

    if (loading) {
        renderInfoBox = (
            <ReactLoading
                className={classes.loading}
                type="spin"
                color="blue"
            />
        )
    }
    else if (streakArray[2] === undefined) {
        renderInfoBox = (
            <Card>
                <CardContent>
                    <Typography>
                        There was no bullish bitween the given days
                </Typography>
                </CardContent>
            </Card>
        )
    }
    else if (streakArray) {
        renderInfoBox = (
            <Card>
                <CardContent>
                    <Typography>
                        Longest bullish bitween given days was {streakArray[2]}
                    </Typography>
                    <Typography>
                        Starting from {streakArray[1][0]}
                    </Typography>
                    <Typography>
                        And ending at {streakArray[0][0]}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
    return (
        <div className={classes.root} >
            {renderInfoBox}
            {renderArrayBox}
        </div>
    )
}

export default InfoBox