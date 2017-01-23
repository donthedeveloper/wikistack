'use strict'

const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const models = require('./models');
const wikiRouter = require('./routes/wiki');


app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });



app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/wiki', wikiRouter);
app.use(express.static('public'));

models.User.sync({})
.then(function () {
    return models.Page.sync()
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);





