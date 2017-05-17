// All Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

// Port infomation
var port = 8000;

// Create express app
app = express();

// Pase date from HTTP POST form
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection to database
var connection = mongoose.connect('mongodb://localhost/message_board', function(err, db)
{
  if(err)
  {
    console.log("Errors: " + err);
  }
});

// Connects View folder location
app.set('views', path.join(__dirname, './views'));

// Templating engine to use
app.set('view engine', 'ejs');

// Create Schema
var Schema = mongoose.Schema;

// Attach it as a model to the database
var MessageSchema = new mongoose.Schema(
{
  name: String,
  message: String,
  _comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamp: true });

var CommentSchema = new mongoose.Schema(
{
  name: String,
  text: String,
  _message: {type: Schema.Types.ObjectId, ref: 'Message'}
}, { timestamp: true });

// Validations
MessageSchema.path('name').required(true, 'Name cannot be blank');
MessageSchema.path('message').required(true, 'Message cannot be blank');
MessageSchema.path('name').minlength(4, 'The length is too short');

CommentSchema.path('name').required(true, 'Name cannot be blank');
CommentSchema.path('text').required(true, 'Comment cannot be blank');

//Takes the model and creates a collection called the model + and s to make it plural
mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);

// Lets you create a new model
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

// Routes
// Main page
// Show All Messages and Comments
app.get('/', function(req, res)
{
  Message.find({}, false, true)
  .populate('_comments')
  .exec(function(err, messages)
  {
    res.render('index', { messages: messages });
  });
});

// Post a message
app.post('/message', function(req, res)
{
  var newMessage = new Message({ name: req.body.name, message: req.body.message });
  newMessage.save(function(err)
  {
    if(err)
    {
      console.log(err);
      res.render('index.ejs', { errors: newMessage.errors });
    }
    else
    {
      console.log('success');
      res.redirect('/')
    }
  });
});

// Post a comment based on the message id
app.post('/comment/:id', function(req, res)
{
  var message_id = req.params.id;
  Message.findOne({ _id: message_id }, function(err, message)
  {
    var newComment = new Comment({ name: req.body.name, text: req.body.comment });
    newComment._message = message._id;
    Message.update({ _id: message._id }, { $push: {'_comments': newComment }}, function(err)
    {

    });
    newComment.save(function(err)
    {
      if(err)
      {
        console.log(err);
        res.render('index.ejs', { errors: newComment.errors });
      }
      else
      {
        console.log('comment added');
        res.redirect('/');
      }
    });
  });
});

// Attach express app to port
app.listen(port, function()
{
  console.log("Connecting to port number: " + port);
});
