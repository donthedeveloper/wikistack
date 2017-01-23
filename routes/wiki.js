const express = require('express');
const wikiRouter = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/', (req, res) => {
  Page.findAll()
  .then(function(content){
    res.render('index', { pages: content })
  })
});

wikiRouter.post('/', (req, res) => {
  var userId;

  User.find({
    where: {
      name: req.body.author
    }
  })
  .then(function(user) {
    if (!user) {
      return User.build({
        name: req.body.author,
        email: req.body.email
      })
      .save();
    }
  })
  .then(function(user) {
    userId = user.getDataValue('id');
    console.log('user', user);
  });

  Page.build({
    title: req.body.title,
    content: req.body.article
  })
  .save()
  .then(function (result){
    result.setAuthor(userId);
    res.redirect(result.route);
  })
});

wikiRouter.get('/add', (req, res) => {
  res.render('addpage');
});

wikiRouter.get('/:urlTitle', function(req, res) {
   Page.find({
     where: {
       urlTitle: req.params.urlTitle
     }
   }).then(function(content){
     res.render('wikipage', { page: content.dataValues });
   })

});


module.exports = wikiRouter;
