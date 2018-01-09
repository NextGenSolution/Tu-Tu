/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(4));
__export(__webpack_require__(5));


/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("mongoose");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var models_1 = __webpack_require__(0);
var MessageSocket = (function () {
    function MessageSocket(io, room) {
        var _this = this;
        this.room = room;
        this.nsp = io.of("/messages/" + encodeURIComponent(this.room));
        this.nsp.on("connection", function (socket) {
            console.log("Client connected to room:", _this.room);
            _this.socket = socket;
            _this.listen();
        });
    }
    // Add signal
    MessageSocket.prototype.listen = function () {
        var _this = this;
        this.socket.on("disconnect", function () { return _this.disconnect(); });
        this.socket.on("create", function (message) { return _this.create(message); });
        this.socket.on("list", function () { return _this.list(); });
    };
    // Handle disconnect
    MessageSocket.prototype.disconnect = function () {
        console.log("Client disconnected from room:", this.room);
    };
    // Create a message in a room
    MessageSocket.prototype.create = function (message) {
        var _this = this;
        models_1.Message.create(message, function (error, message) {
            if (!error && message) {
                _this.nsp.emit("create", message);
            }
        });
    };
    // List all messages in a room
    MessageSocket.prototype.list = function () {
        var _this = this;
        if (this.socket && this.socket.connected) {
            models_1.Message
                .find({ room: this.room }) // Find messages only on this room
                .sort({ created: -1 }) // Sort newest messages first
                .limit(25) // Limit to 25 first results
                .exec(function (error, messages) {
                for (var _i = 0, _a = messages.reverse(); _i < _a.length; _i++) {
                    var message = _a[_i];
                    _this.socket.emit("create", message);
                }
            });
        }
    };
    return MessageSocket;
}());
exports.MessageSocket = MessageSocket;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
var express = __webpack_require__(8);
var http = __webpack_require__(9);
var serveStatic = __webpack_require__(11);
var path = __webpack_require__(10);
var socketIo = __webpack_require__(12);
var mongoose = __webpack_require__(1);
var models_1 = __webpack_require__(0);
var socket_1 = __webpack_require__(6);
var Server = (function () {
    function Server() {
        var _this = this;
        // Create expressjs application
        this.app = express();
        // Configure application
        this.config();
        // Setup routes
        //this.routes();
        var router;
        router = express.Router();
        // Static assets
        this.app.use('/assets', serveStatic(path.resolve(this.root, 'assets')));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.get('/chat', function (req, res) {
            var array = [];
            models_1.Room.find({}).exec(function (error, rooms) {
                var noOfRooms = rooms.length;
                var occurence = 0;
                for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
                    var room = rooms_1[_i];
                    models_1.Message.findOne({ 'room': room.name }).sort({ created: -1 }).limit(1).exec(function (err, messages) {
                        array.push({ name: messages.from, text: messages.message, time: messages.created.getTime() });
                        occurence++;
                        if (occurence == noOfRooms) {
                            res.send(array);
                        }
                    });
                }
            });
        });
        // Set router to serve index.html (e.g. single page app)
        router.get('/', function (request, result) {
            result.sendFile(path.join(_this.root, '/index.html'));
        });
        this.app.use('*', router);
        // Set app to use router as the default route
        // Create server
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server);
        var roomSocket = new socket_1.RoomSocket(this.io);
        // Create database connections
        this.databases();
        // Handle websockets
        //this.sockets();
        // Start listening
        this.listen();
    }
    // Bootstrap the application.
    Server.bootstrap = function () {
        return new Server();
    };
    // Configuration
    Server.prototype.config = function () {
        // By default the port should be 5000
        this.port = process.env.PORT || 5000;
        // root path is under ../../target
        this.root = path.join(path.resolve(__dirname, '../../target'));
    };
    // Configure routes
    Server.prototype.routes = function () {
    };
    // Configure databases
    Server.prototype.databases = function () {
        // MongoDB URL
        var mongoDBUrl = process.env.MONGODB_URI || 'mongodb://localhost/chat';
        // Get MongoDB handle
        this.mongo = mongoose.connect(mongoDBUrl);
    };
    // Configure sockets
    Server.prototype.sockets = function () {
        // Get socket.io handle
    };
    // Start HTTP server listening
    Server.prototype.listen = function () {
        var _this = this;
        //listen on provided ports
        this.server.listen(this.port);
        //add error handler
        this.server.on("error", function (error) {
            console.log("ERROR", error);
        });
        //start listening on port
        this.server.on("listening", function () {
            console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', _this.port, _this.port);
        });
    };
    return Server;
}());
// Bootstrap the server
var server = Server.bootstrap();
module.exports = server.app;

/* WEBPACK VAR INJECTION */}.call(exports, "src\\server"))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var mongoose = __webpack_require__(1);
exports.MessageSchema = new mongoose.Schema({
    room: {
        type: String,
        index: true
    },
    created: Date,
    from: String,
    to: String,
    message: String
});
exports.Message = mongoose.model("Message", exports.MessageSchema);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var mongoose = __webpack_require__(1);
exports.RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    created: Date
});
exports.Room = mongoose.model("Room", exports.RoomSchema);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(2));
__export(__webpack_require__(7));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var models_1 = __webpack_require__(0);
var message_1 = __webpack_require__(2);
var RoomSocket = (function () {
    function RoomSocket(io) {
        var _this = this;
        this.io = io;
        this.rooms = {};
        this.nsp = this.io.of("/room");
        this.nsp.on("connection", function (socket) {
            console.log("Client connected");
            _this.socket = socket;
            _this.listen();
        });
    }
    // Add signal
    RoomSocket.prototype.listen = function () {
        var _this = this;
        this.socket.on("disconnect", function () { return _this.disconnect(); });
        this.socket.on("create", function (name) { return _this.create(name); });
        this.socket.on("remove", function (name) { return _this.remove(name); });
        this.socket.on("list", function () { return _this.list(); });
    };
    // Handle disconnect
    RoomSocket.prototype.disconnect = function () {
        console.log("Client disconnected");
    };
    // Create room and emit it
    RoomSocket.prototype.createRoom = function (room) {
        if (!this.rooms[room.name]) {
            console.log("Creating namespace for room:", room.name);
            this.rooms[room.name] = new message_1.MessageSocket(this.io, room.name);
        }
        this.nsp.emit("create", room);
    };
    // Create a room
    RoomSocket.prototype.create = function (name) {
        var _this = this;
        models_1.Room.create({
            name: name,
            created: new Date(),
            messages: []
        }, function (error, room) {
            if (!error && room) {
                _this.createRoom(room);
            }
        });
    };
    // Remove a room
    RoomSocket.prototype.remove = function (name) {
        var _this = this;
        // First remove room messages
        models_1.Message.remove({
            room: name
        }).exec();
        // Remove room
        models_1.Room.remove({
            name: name
        }).exec(function (error, room) {
            if (!error && room) {
                _this.nsp.emit("remove", room);
            }
        });
    };
    // List all rooms
    RoomSocket.prototype.list = function () {
        var _this = this;
        if (this.socket && this.socket.connected) {
            models_1.Room.find({}).exec(function (error, rooms) {
                for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
                    var room = rooms_1[_i];
                    _this.createRoom(room);
                }
            });
        }
    };
    return RoomSocket;
}());
exports.RoomSocket = RoomSocket;


/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("http");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("serve-static");

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("socket.io");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

// Instantiate server app
var app = __webpack_require__(3);


/***/ }
/******/ ]);