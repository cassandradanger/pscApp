const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// route to get count of on_patrol = true from user table
router.get('/', (req, res) => {
  let queryText = `SELECT * from "user" 
  WHERE "on_patrol" = true;`;
  pool.query(queryText).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('Error in get patrol', error);
    res.sendStatus(500);
  })
})

router.put('/status', (req,res) => {
  console.log('REQ IS', req.body.patrolValue);
  let queryText = `UPDATE "user" 
  SET "on_patrol" = $1
  WHERE "id" = $2;`;
  pool.query(queryText, [req.body.patrolValue, req.user.id]).then((result) => {
    res.sendStatus(202)
  }).catch(error => {
    console.log('error in patrol status router', error);
    res.sendStatus(500)
  })
})

module.exports = router;