import * as express from "express";
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";
import * as mongoose from "mongoose";
import { IRoom, Room, IMessage, Message ,IEventCal ,EventCal} from "../models";
var bodyParser = require('body-parser');

import { RoomSocket } from "./socket";

declare var process, __dirname;

class Server {
    public app: any;
    private server: any;
    private io: any;
    private mongo: any;
    private root: string;
    private port: number;
    private messages:IMessage[];
    // Bootstrap the application.
    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        // Create expressjs application
        this.app = express();
        this.app.use(bodyParser.json());
        // Configure application
        this.config();

        // Setup routes
        //this.routes();
        let router: express.Router;
        router = express.Router();

        // Static assets
        this.app.use('/assets', serveStatic(path.resolve(this.root, 'assets')));
        this.app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
        });

        //Get chats
        this.app.get('/chat',(req, res) => {
          let array = [];
          Room.find({}).exec( (error: any, rooms) => {
                var noOfRooms = rooms.length;
                var occurence = 0 ;
                for (let room of rooms) {
                   Message.findOne({'room':room.name}).sort({created: -1}).limit(1).exec(function(err: any, messages:IMessage){
                      array.push({name:messages.from,text:messages.message,time:messages.created.getTime(),room:room.name});
                      occurence++;
                      if(occurence == noOfRooms){
                        res.send(array);
                      }
                    });
                 }
         });
        });

        //Post events
        this.app.post('/cal',(req,res) => {
          var eventCal = new EventCal(req.body);
          eventCal.save(function(err){
            if(err){
                console.log('error');
            }
            res.send("Success");
          })
        });


        this.app.get('/calc', (req, res) => {
            let array = [] ;
            EventCal.find({}).exec((error : any, eventsCal) => {
                res.send(eventsCal);
            });

        });
        // Set router to serve index.html (e.g. single page app)
        router.get('/', (request: express.Request, result: express.Response) => {
            result.sendFile(path.join(this.root, '/index.html'));
        });
        this.app.use('*', router);
        // Set app to use router as the default route
        // Create server
        this.server = http.createServer(this.app);

        this.io = socketIo(this.server);
        let roomSocket = new RoomSocket(this.io);

        // Create database connections
        this.databases();

        // Handle websockets
        //this.sockets();

        // Start listening
        this.listen();
    }

    // Configuration
    private config(): void {
        // By default the port should be 5000
        this.port = process.env.PORT || 5000;

        // root path is under ../../target
        this.root = path.join(path.resolve(__dirname, '../../target'));

    }

    // Configure routes
    private routes(): void {

    }

    // Configure databases
    private databases(): void {
        // MongoDB URL
        let mongoDBUrl = process.env.MONGODB_URI || 'mongodb://localhost/chat';

        // Get MongoDB handle
        this.mongo = mongoose.connect(mongoDBUrl);
    }

    // Configure sockets
    private sockets(): void {
        // Get socket.io handle

    }

    // Start HTTP server listening
    private listen(): void {
        //listen on provided ports
        this.server.listen(this.port);

        //add error handler
        this.server.on("error", error => {
            console.log("ERROR", error);
        });

        //start listening on port
        this.server.on("listening", () => {
            console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', this.port, this.port);
        });

    }
}

// Bootstrap the server
let server = Server.bootstrap();
export = server.app;
