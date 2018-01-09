webpackJsonp([1],{

/***/ 1006:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var user_service_1 = __webpack_require__(168);
var styles = __webpack_require__(707);
var template = __webpack_require__(712);
var AppComponent = (function () {
    function AppComponent(userService) {
        this.userService = userService;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "app",
            styles: [styles],
            template: template
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ },

/***/ 1007:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var shared_1 = __webpack_require__(117);
var styles = __webpack_require__(708);
var template = __webpack_require__(713);
var ControlComponent = (function () {
    function ControlComponent(roomService) {
        this.roomService = roomService;
        this.room = "";
        this.newRoom = "";
    }
    // Join room, when Join-button is pressed
    ControlComponent.prototype.join = function () {
        this.roomService.join(this.room);
    };
    // Create room, when Create-button is pressed and empty newRoom text input
    ControlComponent.prototype.create = function () {
        this.roomService.create(this.newRoom);
        this.newRoom = "";
    };
    // Remove room, when Remove-button is pressed and unset selected room
    ControlComponent.prototype.remove = function () {
        this.roomService.remove(this.room);
        this.room = "";
    };
    // Handle keypress event (for creating a new room)
    ControlComponent.prototype.eventHandler = function (event) {
        if (event.key === "Enter") {
            this.create();
        }
    };
    ControlComponent = __decorate([
        core_1.Component({
            selector: "control",
            styles: [styles],
            template: template
        }), 
        __metadata('design:paramtypes', [shared_1.RoomService])
    ], ControlComponent);
    return ControlComponent;
}());
exports.ControlComponent = ControlComponent;


/***/ },

/***/ 1008:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(1007));


/***/ },

/***/ 1009:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(1010));


/***/ },

/***/ 1010:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var shared_1 = __webpack_require__(117);
var styles = __webpack_require__(709);
var template = __webpack_require__(714);
var NicknameComponent = (function () {
    function NicknameComponent(userService) {
        this.userService = userService;
        this.nickname = userService.nickname;
    }
    // After view initialised, focus on nickname text input
    NicknameComponent.prototype.ngAfterViewInit = function () {
        this.focus.nativeElement.focus();
    };
    // Save nickname to user store
    NicknameComponent.prototype.save = function () {
        this.userService.nickname = this.nickname;
    };
    // Handle keypress event, for saving nickname
    NicknameComponent.prototype.eventHandler = function (event) {
        if (event.key === "Enter") {
            this.save();
        }
    };
    __decorate([
        core_1.ViewChild('focus'), 
        __metadata('design:type', core_1.ElementRef)
    ], NicknameComponent.prototype, "focus", void 0);
    NicknameComponent = __decorate([
        core_1.Component({
            selector: 'nickname',
            styles: [styles],
            template: template
        }), 
        __metadata('design:paramtypes', [shared_1.UserService])
    ], NicknameComponent);
    return NicknameComponent;
}());
exports.NicknameComponent = NicknameComponent;


/***/ },

/***/ 1011:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(1013));


/***/ },

/***/ 1012:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var rxjs_1 = __webpack_require__(120);
var immutable_1 = __webpack_require__(170);
var shared_1 = __webpack_require__(117);
var MessageService = (function () {
    function MessageService(room) {
        var _this = this;
        this.room = room;
        this.messages = new rxjs_1.ReplaySubject(1);
        this.list = immutable_1.List();
        this.socketService = new shared_1.SocketService();
        this.socketService
            .get("messages/" + encodeURIComponent(this.room))
            .subscribe(function (socketItem) {
            var message = socketItem.item;
            _this.list = _this.list.push(message);
            _this.messages.next(_this.list);
        }, function (error) { return console.log(error); });
    }
    // Emit message using socket service
    MessageService.prototype.create = function (from, message) {
        this.socketService.socket.emit("create", {
            room: this.room,
            created: new Date(),
            from: from,
            to: "",
            message: message
        });
    };
    return MessageService;
}());
exports.MessageService = MessageService;


/***/ },

/***/ 1013:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var shared_1 = __webpack_require__(117);
var message_service_1 = __webpack_require__(1012);
var styles = __webpack_require__(710);
var template = __webpack_require__(715);
var RoomComponent = (function () {
    function RoomComponent(roomService, userService, socketService) {
        this.roomService = roomService;
        this.userService = userService;
        this.socketService = socketService;
        this.message = "";
        this.alreadyLeftChannel = false;
    }
    // Handle keypress event, for saving nickname
    RoomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService = new message_service_1.MessageService(this.room.name);
        this.messageService.messages.subscribe(function (messages) {
            _this.messages = messages;
            setTimeout(function () {
                _this.scrollToBottom();
            }, 200);
        });
        this.messageService.create(this.userService.nickname, "joined the channel");
    };
    // After view initialized, focus on chat message text input
    RoomComponent.prototype.ngAfterViewInit = function () {
        this.focus.nativeElement.focus();
    };
    // When component is destroyed, ensure that leave message is sent
    RoomComponent.prototype.ngOnDestroy = function () {
        if (!this.alreadyLeftChannel) {
            this.leave();
        }
    };
    // Send chat message, and reset message text input
    RoomComponent.prototype.send = function () {
        this.messageService.create(this.userService.nickname, this.message);
        this.message = "";
    };
    // Leave room gracefully
    RoomComponent.prototype.leave = function () {
        this.alreadyLeftChannel = true;
        this.messageService.create(this.userService.nickname, "left the channel");
        this.roomService.leave(this.room.name);
    };
    //* Scroll to bottom (this is called when new message is received)
    RoomComponent.prototype.scrollToBottom = function () {
        try {
            this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
        }
        catch (error) {
            console.log("ERROR:", error);
        }
    };
    // Handle keypress event, for sending chat message
    RoomComponent.prototype.eventHandler = function (event) {
        if (event.key === "Enter") {
            this.send();
        }
    };
    __decorate([
        core_1.ViewChild('scroll'), 
        __metadata('design:type', core_1.ElementRef)
    ], RoomComponent.prototype, "scroll", void 0);
    __decorate([
        core_1.ViewChild('focus'), 
        __metadata('design:type', core_1.ElementRef)
    ], RoomComponent.prototype, "focus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RoomComponent.prototype, "room", void 0);
    RoomComponent = __decorate([
        core_1.Component({
            selector: 'room',
            styles: [styles],
            template: template
        }), 
        __metadata('design:paramtypes', [shared_1.RoomService, shared_1.UserService, shared_1.SocketService])
    ], RoomComponent);
    return RoomComponent;
}());
exports.RoomComponent = RoomComponent;


/***/ },

/***/ 1014:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(1015));


/***/ },

/***/ 1015:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var shared_1 = __webpack_require__(117);
var styles = __webpack_require__(711);
var template = __webpack_require__(716);
var RoomsComponent = (function () {
    function RoomsComponent(userService) {
        this.userService = userService;
    }
    RoomsComponent = __decorate([
        core_1.Component({
            selector: "rooms",
            styles: [styles],
            template: template
        }), 
        __metadata('design:paramtypes', [shared_1.UserService])
    ], RoomsComponent);
    return RoomsComponent;
}());
exports.RoomsComponent = RoomsComponent;


/***/ },

/***/ 1016:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var order_by_pipe_1 = __webpack_require__(422);
var room_service_1 = __webpack_require__(423);
var socket_service_1 = __webpack_require__(262);
var user_service_1 = __webpack_require__(168);
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                order_by_pipe_1.OrderByPipe
            ],
            providers: [
                room_service_1.RoomService,
                socket_service_1.SocketService,
                user_service_1.UserService
            ],
            exports: [
                order_by_pipe_1.OrderByPipe
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;


/***/ },

/***/ 1025:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var platform_browser_dynamic_1 = __webpack_require__(171);
// root component
var app_module_1 = __webpack_require__(446);
// global styles
__webpack_require__(444);
if (false) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(422));
__export(__webpack_require__(423));
__export(__webpack_require__(262));
__export(__webpack_require__(168));


/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var UserService = (function () {
    function UserService() {
        this.nickname = "";
        this.rooms = [];
    }
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;


/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var rxjs_1 = __webpack_require__(120);
var io = __webpack_require__(266);
var SocketService = (function () {
    function SocketService() {
        this.host = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    }
    // Get items observable
    SocketService.prototype.get = function (name) {
        var _this = this;
        this.name = name;
        var socketUrl = this.host + "/" + this.name;
        this.socket = io.connect(socketUrl);
        this.socket.on("connect", function () { return _this.connect(); });
        this.socket.on("disconnect", function () { return _this.disconnect(); });
        this.socket.on("error", function (error) {
            console.log("ERROR: \"" + error + "\" (" + socketUrl + ")");
        });
        // Return observable which follows "create" and "remove" signals from socket stream
        return rxjs_1.Observable.create(function (observer) {
            _this.socket.on("create", function (item) { return observer.next({ action: "create", item: item }); });
            _this.socket.on("remove", function (item) { return observer.next({ action: "remove", item: item }); });
            return function () { return _this.socket.close(); };
        });
    };
    // Create signal
    SocketService.prototype.create = function (name) {
        this.socket.emit("create", name);
    };
    // Remove signal
    SocketService.prototype.remove = function (name) {
        this.socket.emit("remove", name);
    };
    // Handle connection opening
    SocketService.prototype.connect = function () {
        console.log("Connected to \"" + this.name + "\"");
        // Request initial list when connected
        this.socket.emit("list");
    };
    // Handle connection closing
    SocketService.prototype.disconnect = function () {
        console.log("Disconnected from \"" + this.name + "\"");
    };
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;


/***/ },

/***/ 422:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var OrderByPipe = (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (input, orderer, reverse) {
        if (reverse === void 0) { reverse = false; }
        if (input && orderer) {
            var output = input.sort(this.dynamicSort(orderer));
            if (reverse) {
                return output.reverse();
            }
            else {
                return output;
            }
        }
        else {
            return input;
        }
    };
    OrderByPipe.prototype.dynamicSort = function (property) {
        return function (a, b) {
            return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        };
    };
    OrderByPipe = __decorate([
        core_1.Pipe({
            name: 'orderBy'
        }), 
        __metadata('design:paramtypes', [])
    ], OrderByPipe);
    return OrderByPipe;
}());
exports.OrderByPipe = OrderByPipe;


/***/ },

/***/ 423:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var rxjs_1 = __webpack_require__(120);
var immutable_1 = __webpack_require__(170);
var socket_service_1 = __webpack_require__(262);
var user_service_1 = __webpack_require__(168);
var RoomService = (function () {
    function RoomService(socketService, userService) {
        var _this = this;
        this.socketService = socketService;
        this.userService = userService;
        this.rooms = new rxjs_1.ReplaySubject(1);
        this.list = immutable_1.List();
        this.socketService
            .get("room")
            .subscribe(function (socketItem) {
            var room = socketItem.item;
            var index = _this.findIndex(room.name);
            if (socketItem.action === "remove") {
                // Remove
                _this.list = _this.list.delete(index);
            }
            else {
                if (index === -1) {
                    // Create
                    _this.list = _this.list.push(room);
                }
                else {
                    // Update
                    _this.list = _this.list.set(index, room);
                }
            }
            _this.rooms.next(_this.list);
        }, function (error) { return console.log(error); });
    }
    // Join room
    RoomService.prototype.join = function (name) {
        for (var roomIndex in this.userService.rooms) {
            var room = this.userService.rooms[roomIndex];
            if (room.name === name) {
                return;
            }
        }
        var index = this.findIndex(name);
        if (index !== -1) {
            var room = this.list.get(index);
            this.userService.rooms.push(room);
        }
    };
    // Leave room
    RoomService.prototype.leave = function (name) {
        // First remove the room from user joined rooms
        for (var i = 0; i < this.userService.rooms.length; i++) {
            var room = this.userService.rooms[i];
            if (room.name === name) {
                this.userService.rooms.splice(i, 1);
            }
        }
    };
    // Create room
    RoomService.prototype.create = function (name) {
        this.socketService.create(name);
    };
    // Remove room
    RoomService.prototype.remove = function (name) {
        // First remove the room from user joined rooms
        for (var i = 0; i < this.userService.rooms.length; i++) {
            var room = this.userService.rooms[i];
            if (room.name === name) {
                this.userService.rooms.splice(i, 1);
            }
        }
        // Send signal to remove the room
        this.socketService.remove(name);
    };
    // Find matching room
    RoomService.prototype.findIndex = function (name) {
        return this.list.findIndex(function (room) {
            return room.name === name;
        });
    };
    RoomService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [socket_service_1.SocketService, user_service_1.UserService])
    ], RoomService);
    return RoomService;
}());
exports.RoomService = RoomService;


/***/ },

/***/ 444:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 446:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var platform_browser_1 = __webpack_require__(169);
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(119);
var forms_1 = __webpack_require__(265);
// App component
var app_component_1 = __webpack_require__(1006);
// Shared module
var shared_module_1 = __webpack_require__(1016);
// Other components
var control_1 = __webpack_require__(1008);
var nickname_1 = __webpack_require__(1009);
var room_1 = __webpack_require__(1011);
var rooms_1 = __webpack_require__(1014);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                app_component_1.AppComponent,
                control_1.ControlComponent,
                nickname_1.NicknameComponent,
                room_1.RoomComponent,
                rooms_1.RoomsComponent
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ },

/***/ 707:
/***/ function(module, exports) {

module.exports = "h1{background-color:orange;padding:0.5em 1em;margin:0;font-size:1.2em;font-weight:normal;text-transform:uppercase;letter-spacing:0.2em}\n"

/***/ },

/***/ 708:
/***/ function(module, exports) {

module.exports = ":host{display:block;background-color:chocolate;padding:0.5em;margin:0}span{padding:0;margin:0 3em 0 0}\n"

/***/ },

/***/ 709:
/***/ function(module, exports) {

module.exports = ":host{display:block;padding:1em}\n"

/***/ },

/***/ 710:
/***/ function(module, exports) {

module.exports = ":host{width:100%;display:inline-block}@media (min-width: 700px) and (max-width: 999px){:host{width:50%;float:left}}@media (min-width: 1000px) and (max-width: 1299px){:host{width:33.333333%;float:left}}@media (min-width: 1300px) and (max-width: 1599px){:host{width:25%;float:left}}@media (min-width: 1600px) and (max-width: 1899px){:host{width:20%;float:left}}@media (min-width: 1900px) and (max-width: 2199px){:host{width:16.666666%;float:left}}@media (min-width: 2200px){:host{width:14.285714%;float:left}}.box{border:1px solid black;padding:0;margin:0.25em;background-color:white;box-shadow:0.25em 0.25em 0.5em rgba(0,0,0,0.5)}h1{color:white;background-color:black;margin:0;padding:0.25em;font-size:1em}h2{color:white;background-color:gray;margin:0;padding:0.25em;font-size:0.7em}h3{color:white;background-color:gray;margin:0;padding:0.25em;font-size:1em}.leave{float:right;margin:0.25em}.dimmed{color:silver}.messages{overflow-y:scroll;overflow-x:hidden;height:20em;padding:0;margin:0;font-size:0.8em}.message{margin:0 0 0.2em 0;padding:0}.top-bar{background:#666;color:white;padding:10px;position:relative;overflow:hidden}.chat-window{bottom:0;right:0;position:fixed;float:right;margin-left:10px}.chat-window>div>.panel{border-radius:5px 5px 0 0}.msg-container-base{background:#e5e5e5;margin:0;padding:0 10px 10px;max-height:300px;overflow-x:hidden}\n"

/***/ },

/***/ 711:
/***/ function(module, exports) {

module.exports = ":host{display:block;padding:0.25em;margin:0}:host:after{content:\" \";clear:both}\n"

/***/ },

/***/ 712:
/***/ function(module, exports) {

module.exports = "<h1></h1>\r\n<nickname *ngIf=\"!userService.nickname || userService.nickname === ''\"></nickname>\r\n<control *ngIf=\"userService.nickname && userService.nickname !== ''\"></control>\r\n<rooms *ngIf=\"userService.nickname && userService.nickname !== ''\"></rooms>"

/***/ },

/***/ 713:
/***/ function(module, exports) {

module.exports = "<span>\r\n    <select [(ngModel)]=\"room\">\r\n        <option value=\"\">Select room...</option>\r\n        <option *ngFor=\"let room of roomService.rooms | async\" [value]=\"room.name\">{{room.name}}</option>\r\n    </select>\r\n    <button (click)=\"join()\">Join</button>\r\n    <button (click)=\"remove()\">Remove</button>\r\n</span>\r\n<span>\r\n    New room:\r\n    <input [(ngModel)]=\"newRoom\" (keypress)=\"eventHandler($event)\">\r\n    <button (click)=\"create()\">Create</button>\r\n</span>\r\n"

/***/ },

/***/ 714:
/***/ function(module, exports) {

module.exports = "<h1>Nickname</h1>\r\n\r\n<p>\r\n  ck name sasin oder tart chatting!\r\n</p>\r\n\r\n<p>\r\n    <input #focus [(ngModel)]=\"nickname\" (keypress)=\"eventHandler($event)\">\r\n    <button class=\"btn btn-info\" (click)=\"save()\">Save</button>\r\n</p>"

/***/ },

/***/ 715:
/***/ function(module, exports) {

module.exports = "<div class=\"chat-window-container\">\r\n    <div class=\"chat-window\">\r\n        <div class=\"panel-container\">\r\n            <div class=\"panel panel-default\">\r\n                <div class=\"panel-heading top-bar\" style=\"backgroun\">\r\n                    <div class=\"panel-title-container\">\r\n                        <h3 class=\"panel-title\">\r\n                        <span class=\"glyphicon glyphicon-comment\"></span>\r\n                        Chat - {{room.name}}\r\n                        </h3>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"panel-body msg-container-base\" #scroll>\r\n                <div class=\"message\" *ngFor=\"let item of messages | orderBy:'created':false\">\r\n                    <span class=\"dimmed\">{{item.created}}</span>\r\n                    &lt;{{item.from}}&gt;\r\n                    {{item.message}}\r\n                </div>\r\n            </div>\r\n            <div class=\"panel-footer\">\r\n                <div class=\"input-group\">\r\n                <input #focus class=\"chat-input\" [(ngModel)]=\"message\" (keypress)=\"eventHandler($event)\">\r\n                <button class=\"btn btn-danger\" (click)=\"send()\">Send</button>\r\n                <button class=\"leave btn btn-danger\" (click)=\"leave(room)\">Leave</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ },

/***/ 716:
/***/ function(module, exports) {

module.exports = "<template ngFor let-room [ngForOf]=\"userService.rooms\">\r\n    <room [room]=\"room\"></room>\r\n</template>"

/***/ }

},[1025]);
//# sourceMappingURL=main.js.map