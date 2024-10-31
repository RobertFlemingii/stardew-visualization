const fs = require("fs");
const csv = require("csv-parser");

exports.handler = async function (event, context) {
  const results = [];
  fs.createReadStream("./data/mining.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      return {
        statusCode: 200,
        body: JSON.stringify(results),
      };
    });
};
