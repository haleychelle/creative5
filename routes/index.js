var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Meme = mongoose.model('Meme');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/memes', function(req, res, next) {
  Meme.find(function(err, memes) {
    if(err) { return next(err); }
    res.json(memes);
  });
});

router.post('/memes', function(req, res, next) {
  var meme = new Meme(req.body);
  meme.save(function(err, meme) {
    if(err){ return next(err); }
    res.json(meme);
  });
});

router.param('meme', function(req, res, next, id) {
  var query = Meme.findById(id);
  query.exec(function (err, meme) {
    if (err) { return next(err); }
    if (!meme) { return next(new Error("meme not found error")); }
    req.meme = meme;
    return next();
  });
});

router.get('/memes/:meme', function(req, res) {
  res.json(req.meme);
});

router.put('/memes/:meme/upvote', function(req, res, next) {
  req.meme.upvote(function(err, meme) {
    if(err) { return next(err); }
    res.json(meme);
  });
});

router.put('/memes/:meme/downvote', function(req, res, next) {
  req.meme.downvote(function(err, meme) {
    if(err) {return next(err); }
    res.json(meme);
  });
});

router.delete('/memes/:meme', function(req, res) {
  console.log("in Delete");
  req.meme.remove();
  res.sendStatus(200);
});

module.exports = router;
