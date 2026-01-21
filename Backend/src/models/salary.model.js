import mongoose , {Schema} from "mongoose";

const salary = new Schema({
    employee:{
        type:Schema.Types.ObjectId,
        ref:"Employee"
    },
    netSalary:{
        type:Number,
        required:true
    },
    bonus: {
        type:Number,
    },
    deduction:{
        type:Number,
    },
    totalSalary:{
        type:Number,
        required:true
    }
})