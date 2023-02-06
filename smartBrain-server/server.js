const express = require('express');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const cors = require('cors');

const app = express();

app.use(express.json()); //middleware to parse the body response to json
app.use(cors());

const database = {
    users:[{
        id:'123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id:'124',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: 'bananas',
        entries: 0,
        joined: new Date()
    }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

//checks email and password at the signin url, compares it to the database (for naw variable)
app.post('/signin', (req, res) => {
    // bcrypt.compare("apples", '$2b$10$q5H5DfhUu8iIAm8p7HSKEOe9kxXeWkzuQq9A8jJJZcGkkWSxa8nZi', function(err, result) {
    //     console.log('first guess', result);
    // });
    // bcrypt.compare("veggies", '$2b$10$q5H5DfhUu8iIAm8p7HSKEOe9kxXeWkzuQq9A8jJJZcGkkWSxa8nZi', function(err, result) {
    //     console.log('second guess', result);
    // });
    if(req.body.email === database.users[0].email && 
       req.body.password === database.users[0].password)
        res.json(database.users[0]);
    else
        res.status(400).json('error loggin in');
});

//saves the new information to the database (for now it's lost when server restarts)
app.post('/register', (req, res) => {
    const { name, email, password} = req.body;

    // bcrypt.hash(password, saltRounds, function(err, hash) {
    //     console.log(hash);
    // });

    database.users.push({
        id:'125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length-1]); //response with the user information
});

//shows the profile of the user, based on the id
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found)
        res.status(404).json('not such user')
});

//when an image url is used, it sums it to the user entries counter, using the user id to know who it is 
app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found)
        res.status(400).json('not such user')
});

app.listen(3001, () => {
    console.log('app is running on port 3001');
});