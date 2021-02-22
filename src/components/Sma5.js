import { Card, CardContent } from "@material-ui/core"

export const Sma5 = ({ sma5Array, loading }) => {
    let renderSmaData = null
    if (sma5Array === undefined || sma5Array.length === 0 || loading) {
        renderSmaData = null
    }
    else {
        renderSmaData = (
            <Card>
                {sma5Array.map(d => (
                    <CardContent key={d[0]}>
                        {d[0]} change: {d[7]} $
                    </CardContent>
                ))}
            </Card>
        )
    }
    return (
        <div>
            {renderSmaData}
        </div>
    )
}