if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))


//connecting mongodb
mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser : true}
    );

const db = mongoose.connection;
db.on('error', error => console.error(error) )
db.once('open', ()=> console.log('Connected to Mongoose'))

// Importing Routers
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');

// Setting Routes
app.use('/', indexRouter)
app.use('/authors', authorsRouter)
app.use('/books', booksRouter)


const PORT= process.env.PORT || 3000;

app.listen(PORT)