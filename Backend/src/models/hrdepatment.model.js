import mongoose, { Schema } from "mongoose";

const HrDeparmentSchema = new Schema(
  {
    head_Id:{
      type:String,
      required:true,
      unique:true
    },
    dep_head: {
      type: String,
      required: true,
    },
    numberOfEmployee: {
      type: Number,
      required: true,
    },
    employeeProblem: {
      type: String,
    },
    employee:{
        type:Schema.Types.ObjectId,
        ref:"Employee"
    },
    salary:{
        type:Schema.Types.ObjectId,
        ref:"Salary"
    },
    performance:{
        type:Schema.Types.ObjectId,
        ref:"Performance"
    },
    departments:{
        type:Schema.Types.ObjectId,
        ref:"Department"
    },
  },
  { timestamps: true },
);

export const HrDeparment = mongoose.model("HrDeparment" , HrDeparmentSchema);
