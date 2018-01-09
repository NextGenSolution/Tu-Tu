import * as mongoose from "mongoose";

export interface INotification{
    created: Date;
    from: string;
    to: string;
    message: string;
}

export interface INotificationModel extends INotification, mongoose.Document {}
 
export var NotificationSchema = new mongoose.Schema({
    created: {
        type: Date,
        index: true
    },
    from: String,
    to: String,
    message: String
});

export var Notification = mongoose.model<INotificationModel>("Notification", NotificationSchema);
