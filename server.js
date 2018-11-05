const express = require('express');
const bodyParser = require('body-parser');
const bcrypt  = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex'); 
const register = require('./controllers/register');
const signin = require('./controllers/sigin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test123',
      database : 'smart-brain'
    }
  });


db.select('*').from('users').then(data => {
   console.log(data);
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login:[
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req,res) => {
   res.send(database.user);
});

app.post('/signin', (req,res) => { signin.handelSignin(req,res,db,bcrypt) });

app.post('/register',(req,res) => { register.handleRegister(req,res,db,bcrypt) });

app.get('/profile/:id',  (req,res) => { profile.handleProfileGet(req,res,db) });

app.put('/image', (req,res) => { image.handelImage(req,res,db) });

app.post('/imageurl', (req,res) => { image.handleApiCall(req,res) });


// // Load hash from your password DB.


app.listen(process.env.PORT || 3000,() => {
   console.log(`app is running on port ${process.env.PORT}`);
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:usetId --> GET = user
/image --> PUT --> user

*/