const express = require('express');
const wikiRouter = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/', (req, res) => {
  res.send('home page is working');
});

wikiRouter.get('/:title', function(req, res) {
  if (req.params.title === 'add') {
    res.render('addpage').end();
  } else {
    res.send(req.params.title);
  }
});

wikiRouter.post('/', (req, res) => {
  console.log(req.body);

  var page = Page.build({
    title: req.body.title,
    content: req.body.article,
  });

  page.save();
  res.json(page);
  // res.redirect(page.route);
});

wikiRouter.get('/add', (req, res) => {
  res.render('addpage');
});


module.exports = wikiRouter;
