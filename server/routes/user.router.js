const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const address = req.body.address;
  const email = req.body.email;
  const phone = req.body.phone;
  const adult = req.body.adult;

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, address, email, phone, adult)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
  pool
    .query(queryText, [username, password, first_name, last_name, address, email, phone, adult])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// PUT route to edit user
router.put('/editUser/:id', (req, res) => {
  const id = req.body.id
  const username = req.body.username;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const address = req.body.address;
  const email = req.body.email;
  const phone = req.body.phone;
  const adult = req.body.adult;
  const on_patrol = req.body.on_patrol;
  const on_call = req.body.on_call;
  const role = req.body.role;
  let queryText= `UPDATE "user" 
                  SET 
                    "username" = $1, 
                    "first_name" = $2, 
                    "last_name" = $3, 
                    "address" = $4, 
                    "email" = $5, 
                    "phone" = $6, 
                    "adult" = $7, 
                    "on_patrol" = $8, 
                    "on_call" = $9, 
                    "role" = $10 
                  WHERE 
                    "id" = $11`;
  pool.query(queryText, [username, first_name, last_name, address, email, phone, adult, on_patrol, on_call, role, id])
  .then((result) => {
      res.sendStatus(200);
  }).catch((err) => {
      console.log('error in PUT user', err);
      res.sendStatus(500);
  });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get('/all', rejectUnauthenticated, (req, res) => {
  // data to populate user table
  // retrieving all data from all users
  const queryText = `SELECT * FROM "user";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// below are all the query functions to sort the incident table by column
router.get('/username', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "user" ORDER BY "username";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/first', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "user" ORDER BY "first_name";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/last', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "user" ORDER BY "last_name";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/address', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "user" ORDER BY "address";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/email', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "user" ORDER BY "email";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/phone', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "user" ORDER BY "phone";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/adult', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "user" ORDER BY "adult";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/role', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "user" ORDER BY "role";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/patrol', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "user" ORDER BY "on_patrol";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/oncall', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "user" ORDER BY "on_call";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
