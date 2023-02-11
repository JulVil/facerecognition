const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const postgresDB = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : '',
      password : '',
      database : ''
    }
  });

postgresDB.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(express.json()); //middleware to parse the body response to json
app.use(cors());

app.get('/', (req, res) => {
   
});

//checks email and password at the signin url, compares it to the database
app.post('/signin', (req, res) => {
    postgresDB.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
            .then(data => {
                bcrypt.compare(req.body.password, data[0].hash, function(err, result) {
                    if(result){
                        return postgresDB.select('*').from('users')
                            .where('email', '=', req.body.email)
                            .then(user => {
                                res.json(user[0])
                            })
                            .catch(err => res.status(400).json('unable to get user'))
                    } else
                        res.status(400).json('wrong credentials')
                });
            })
            .catch(err => res.status(400).json('wrong credentials'))
});

//saves the new information to the database
app.post('/register', (req, res) => {
    const { name, email, password} = req.body;

    //create a hash with the password given
    bcrypt.hash(password, saltRounds, function(err, hash) {
        //use transaction to insert hash into login table with email(primary key in this table)
        //then insert name, date and email(foreing key to relate to login table) into users 
        postgresDB.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]); //response with the user information
                    })
                .then(trx.commit)//if everything above goes well, save all into tables
                .catch(trx.rollback)//if there is an error, keep the database as before changes
            })
            .catch(err => res.status(400).json('unable to register'))
        })
    });
});

//shows the profile of the user, based on the id
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;

    postgresDB.select('*').from('users').where({id})
    .then(user => {
        if(user.length)
            res.json(user[0])
        else
            res.status(400).json('not found')
    })
    .catch(err => res.status(400).json('error getting user'))
});

//when an image url is used, it sums it to the user entries counter, using the user id to know who it is 
app.put('/image', (req, res) => {
    const { id } = req.body;

    postgresDB('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
});

app.listen(3001, () => {
    console.log('app is running on port 3001');
});