import mongoose from "mongoose";

const {Schema} = mongoose;

const taskSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    completed : {
        type : Boolean,
        required : false,
        default : false,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
}, {timestamp : true});


export default mongoose.model("Task",taskSchema);