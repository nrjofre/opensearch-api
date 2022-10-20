const express = require('express');
const cors = require('cors');
const { client, indexName: index, recipes } = require("./config");
const { logBody, logTitles } = require("./helpers");

const app = express();

const PORT = (process.env.PORT || 8080)

app.use( express.json() );
app.use( cors() );

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));

// 
app.get('/inject', async(req, res) => {
    console.log(`Ingesting data: ${recipes.length} recipes`);
    const body = recipes.flatMap(doc => [
        { index: { _index: indexName } },
        doc,
      ]);

    client.bulk({ refresh: true, body }, logBody);

    return res.send({msg: "OK"});
});


/**
 * Finding matches sorted by relevance (full-text query)
 * match title "soups with beer and garlic"
 * match title "pizza salad and cheese"
 */
app.get('/match', async(req, res) => {
    const field = req.body.field;
    const query = req.body.query;

    const body = {
        query: {
          match: {
            [field]: {
              query,
            },
          },
        },
      };

      client.search(
        {
          index,
          body,
        },
        logTitles
      );

    return res.send({msg: logTitles});
});

/**
 * Matching a phrase (full-text query)
 * run-func search phrase title 'pasta with cheese'
 * run-func search phrase title 'milk chocolate cake'
 */

 app.get('/phrase', async(req, res) => {
    const field = req.body.field;
    const query = req.body.query;
    const slop = req.body.slop;

    const body = {
        query: {
          match_phrase: {
            [field]: {
              query,
              slop
            },
          },
        },
      };

      client.search(
        {
          index,
          body,
        },
        logTitles
      );

    return res.send({msg: logTitles});
});

/**
   * Using special operators within a query string and a size parameter (full-text query)
   * run-func search queryString title '+(dessert | cake) -garlic  (mango | caramel | cinnamon)'
   * run-func search queryString title '+(salad | soup) -broccoli  (tomato | apple)'
   */
app.get('/querystring', async(req, res) => {
    const field = req.body.field;
    const query = req.body.query;

    const body = {
        query: {
          query_string: {
            default_field: field,
            query,
          },
        },
      };

      client.search(
        {
          index,
          body
        },
        logTitles
      );

    return res.send({msg: logTitles});
});
  
  
  /**
   * Searching for exact matches of a value in a field (term-level query)
   * run-func search term sodium 0
   */

app.get('/term', async(req, res) => {
    const field = req.body.field;
    const value = req.body.value;

    const body = {
        query: {
          term: {
            [field]: value,
          },
        },
      };

      client.search(
        {
          index,
          body,
        },
        logTitles
      );

    return res.send({msg: logTitles});
});

 /**
   * Searching for a range of values in a field (term-level query)
   * gt (greater than)
   * gte (greater than or equal to)
   * lt (less than)
   * lte (less than or equal to)
   * run-func search range sodium 0 100
   */

app.get('/range', async(req, res) => {
    const field = req.body.field;
    const gte = req.body.gte;
    const lte = req.body.lte;

    const body = {
        query: {
          range: {
            [field]: {
              gte,
              lte,
            },
          },
        },
      };

      client.search(
        {
          index,
          body,
        },
        logTitles
      );

    return res.send({msg: logTitles});
});