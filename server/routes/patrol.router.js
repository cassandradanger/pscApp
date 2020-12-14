const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// route to get count of on_patrol = true from user table
router.get('/', (req, res) => {
  let queryText = `SELECT count("on_patrol") AS "on_patrol" from "user" 
  WHERE "on_patrol" = true;`;
  pool.query(queryText).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('Error in get patrolCount', error);
    res.sendStatus(500);
  })
})

module.exports = router;