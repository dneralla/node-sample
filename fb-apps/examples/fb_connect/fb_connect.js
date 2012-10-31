

var express = require('express')
var app = express();

app.configure(function(){
  app.use(express.methodOverride())
  
 
  app.use(express.logger())
  app.use(require('./../../lib/facebook').Facebook,{
    apiKey: '121670191319266', 
    apiSecret: 'ba42c660fab2d6ff70ef236d4360031'
  })
 
})

// Called to get information about the current authenticated user
app.get('/fbSession', function(req, res){
  var fbSession = req.fbSession()

  if(fbSession) {
    // Here would be a nice place to lookup userId in the database
    // and supply some additional information for the client to use
  }

  // The client will only assume authentication was OK if userId exists
  res.send(JSON.stringify(fbSession || {}), res.contentType('json'));
})

// Called after a successful FB Connect
app.post('/fbSession', function(req, res) {
  var fbSession = req.fbSession() // Will return null if verification was unsuccesful

  if(fbSession) {
    // Now that we have a Facebook Session, we might want to store this new user in the db
    // Also, in this.params there is additional information about the user (name, pic, first_name, etc)
    // Note of warning: unlike fbSession, this additional information has not been verified
    fbSession.first_name = req.params['first_name']
  }

  res.send(JSON.stringify(fbSession || {}),res.contentType('json'));
})

// Called on Facebook logout
app.post('/fbLogout', function(req, res) {
  req.fbLogout();
  res.send(JSON.stringify({}))
})

// Static files in ./public
app.get('/', function(req, res){ res.sendfile('index.html') })
app.get('/xd_receiver.htm', function(req, res){ res.sendfile(__dirname + '/public/xd_receiver.htm') })
app.get('/javascripts/jquery.facebook.js', function(res, res){ res.sendfile(__dirname + '/public/javascripts/jquery.facebook.js') })

app.listen(3000)