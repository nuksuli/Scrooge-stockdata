import { Card, CardContent, makeStyles, Typography } from "@material-ui/core"
import ReactLoading from 'react-loading'
const useStyles = makeStyles(() => ({
    root: {
        display: 'inline-block'
    }
}))
const InfoBox = ({ streakArray, loading }) => {
    let renderInfoBox = null
    if (loading) {
        renderInfoBox = (
            <ReactLoading
                type="spin"
                color="blue"
            />
        )
    }
    else if (streakArray[2] === undefined) {
        console.log(streakArray)
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
                        Starting from {streakArray[0][0]}
                    </Typography>
                    <Typography>
                        And ending at {streakArray[1][0]}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
    return (
        <div>
            {renderInfoBox}
        </div>
    )
}

export default InfoBox