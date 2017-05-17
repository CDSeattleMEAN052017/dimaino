var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var port = 8000;

app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/quoting_dojo');

var QuoteSchema = new mongoose.Schema(
{
  name: String,
  quote: String
});

var Quote = mongoose.model('quotes', QuoteSchema);

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

app.get('/', function(req, res)
{
  res.render('index');
});

app.get('/quotes', function(req, res)
{
  Quote.find({}, function(err, results)
  {
    if(err)
    {
      console.log(err);
    }
    res.render('quotes', { quotes: results });
  });
});

app.post('/quotes', function(req, res)
{
  Quote.create(req.body, function(err)
  {
    if(err)
    {
      console.log(err);
    }
    res.redirect('/quotes');
  });
});

app.listen(port);
