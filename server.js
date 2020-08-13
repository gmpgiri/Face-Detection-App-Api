const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db =knex({
    client: 'pg',
    connection: {
      host : 'postgresql-rigid-96819',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

 db.select('*').from('users').then(data => {
     console.log(data);
 })

app.use(express.json());
app.use(cors());
/*
/ --> this is working
/signin --> POST = success/failure
/register --> POST = user (obj)
/profile/:userId --> GET = user (obj)
/image --> PUT --> user

*/

app.get('/',(req,res)=>{
    res.send('it is working');
})

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)} )

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)});

app.put('/image', (req,res) => {image.handleImageCount(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


app.listen(process.env.PORT || 3000,() => {
    console.log(`app is running on port ${process.env.PORT}`);
});




