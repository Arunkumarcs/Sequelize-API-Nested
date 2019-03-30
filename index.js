var path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fs = require('fs');
var md5 = require("md5");
var bodyParser = require("body-parser");
var debug = require('debug')('view-engine:server');
var http = require('http');
var express = require("express");
var flash = require('connect-flash');
import models from './models/index.js';

var common = require("./modules/common");
var app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use("/", express.static(__dirname + "/public"));

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(session({
    secret: common.randomGenerator(50),
    cookie: {
        // secure: true,
        maxAge: 43200000

    },
    resave: false,
    saveUninitialized: true

}));


app.use(flash());

var indexRouter = require('./routes/index');
// var loginRouter = require('./routes/login');
// var registerRouter = require('./routes/register');
// var dashboardRouter = require('./routes/dashboard');
// var profileRouter = require('./routes/profile');
// var chatRouter = require('./routes/chat');
// var adminloginRouter = require('./routes/admincp/login');
// var menuRouter = require('./routes/admincp/menu');
// var pageRouter = require('./routes/page/index');
// var admincpRouter = require('./routes/admincp/index');

app.use('/', indexRouter);
// app.use('/login', loginRouter);
// app.use('/register', registerRouter);
// //app.use('/dashboard', dashboardRouter);
// app.use('/profile', profileRouter);
// app.use('/chat', chatRouter);
// //app.use('/admin/login', adminloginRouter);
// app.use('/admincp/menu', menuRouter);
// app.use('/page', pageRouter);
// app.use('/admincp', admincpRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || 6512);
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

models.sequelize.sync()
.then(function() {
    server.listen(port, function () {
        console.log("Server Stated in Port :: " + port);
    });
    server.on('error', onError);
    server.on('listening', onListening);


})
.catch(function (e) {
    throw new Error(e);
});



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Server Started');
    debug('Listening on ' + bind);
}