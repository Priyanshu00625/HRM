import mongoose, {Schema} from "mongoose";

const performanceSchema = new mongoose.Schema({
  period: {
    type: String,
    enum: ["Monthly", "Quarterly", "Yearly"],
    required: true
  },

  month: {
    type: Number,
    min: 1,
    max: 12
  },

  year: {
    type: Number,
    required: true
  },

  attendanceRate: {
    type: Number,
    min: 0,
    max: 100
  },

  productivityScore: {
    type: Number,
    min: 0,
    max: 10
  },

  rating: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: true
  },

  remarks: String
}, { _id: false });


const departmentSchema = new Schema({
     departmentHead:{
        type:String,
        required:true,
    },
  type: {
    type: String,
    enum: ["HR", "IT", "Finance", "Sales"],
    required: true
  },
    employee:{
        type:Schema.Types.ObjectId,
        ref:"Employee"
    },
    numberOFEmployee:{
        type:Number,
        required:true,
    },
    depProformance:{
        type:[performanceSchema]
    }
},{timestamps:true})

export const Department = mongoose.model("Department",departmentSchema);