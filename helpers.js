var fs = require('fs');

/**
 * Logging result body, used in callbacks.
 */
module.exports.logBody = (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result.body);
    }
};

/**
 * Parsing and logging list of titles from the result, used in callbacks.
 */
module.exports.logTitles = (error, result) => {
    if (error) {
        console.error(error);
    } else {
        const hits = result.body.hits.hits;
        console.log(hits.map((hit) => hit._source.title));
        //const response = (hits.map((hit) => hit._source.title))
        //s.writeFile('response.json', JSON.stringify({ response: response }, null, 4));
        //return (hits.map((hit) => hit._source.title))
    }
};

module.exports.logAggs = (field, error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result.body.aggregations[field]);
    }
};

module.exports.logResultBody = (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result.body);
    }
};