const express = require('express');
const Datastore = require('nedb');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

let db = new Datastore({filename: 'users'});
db.loadDatabase();

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

app.listen(3000);