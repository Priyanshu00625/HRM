import mongoose , {Schema} from "mongoose";

const attendenceSchema = new Schema({
    employee:{
        type:Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    department:{
        type:Schema.Types.ObjectId,
        ref:"Department"
    },
    date: {
    type: Date,
    required: true
  },

  checkIn: {
    type: Date
  },

  checkOut: {
    type: Date
  },

  status: {
    type: String,
    enum: ["Present", "Absent", "Half-Day", "Leave"],
    default: "Present"
  }
},{timestamps:true})

export const Attendence = mongoose.model("Attendence" , attendenceSchema);