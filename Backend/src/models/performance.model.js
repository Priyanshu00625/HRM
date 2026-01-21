import mongoose , {Schema} from "mongoose";

const PerformSchema = new Schema({
    employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
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

  rating: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: true
  },

  remarks: {
    type: String
  },

  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  }
})

export const Performance = mongoose.model("Performance" , PerformSchema);