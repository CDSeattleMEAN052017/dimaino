var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res)
{
  res.render("index");
});

app.get('/result', function(req, res)
{
  res.render("result");
});

app.post('/submitInfo', function (req, res)
{
    submit_Info = {
      name: req.body.name,
      location: req.body.location,
      language: req.body.language,
      comment: req.body.comment
    };
    res.render("result", {user: submit_Info});
});

app.get('/goBack', function(req, res)
{
  res.redirect('/')
});

app.listen(8000, function()
{
 console.log("listening on port 8000");
});
