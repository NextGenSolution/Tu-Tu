import * as mongoose from "mongoose";

export interface IEventCal {
    title: string;
    start: Date;
    end: string;
    uid: number;
}

export interface IEventCalModel extends IEventCal, mongoose.Document {}
 
export var EventCalMessageSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    uid: Number
});

export var EventCal = mongoose.model<IEventCalModel>("EventCals", EventCalMessageSchema);