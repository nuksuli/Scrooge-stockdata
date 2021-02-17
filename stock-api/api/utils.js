const csvtojson = require("csvtojson")

module.exports = {
    csvToJson: (csv) => {
        const content = csv.split('\n');
        const header = content[0].split(',');
        csvtojson({
            noheader: false,
            output: "json"
        })
            .fromString(csv)
            .then((jsonObj) => {
                return jsonObj
            })
    }
}