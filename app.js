var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http');
var port = (process.env.PORT || 3000);

var app = express();

// Get routes
var home = require('./controllers/home');
var chat = require('./controllers/chat');

// Get models and connect to database
var models = require('./models');

// Create server htttp
var server = http.createServer(app);

// view engine setup
app.set('views', [
        path.join(__dirname, 'views'),
        path.join(__dirname, 'controllers/chat/views'),
        path.join(__dirname, 'controllers/home/views')
    ]
);
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// Configure middleware to methodOverride
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use('/', home);
app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Start server
server.listen(port);

// Listener when ocurred error in server
server.on('error',function(error) {
    if (error.syscall !== 'listen')
        throw error;

    var bind = typeof port == 'string' ? 'Pipe ' + port : 'Port' + port;

    // handle specific listen erros with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

server.on('listening', function() {
    var address = server.address();

    var bind = typeof address == 'string' ? 'pipe ' + port : 'port ' + port;

    console.log('listening on ' + bind);
})
