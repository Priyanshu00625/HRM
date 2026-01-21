
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required:true
  },
  phoneNumber:{
    type:Number,
    required:true,
    unique:true
  },
  gender:{
    type:String,
    enum:["MALE" , "FEMALE" , "OTHER"],
    required:true,
  },
  qualification:{
    type:String,
    required:true
  },
  depName:{
    type:String,
    required:true
  },
jobRole:{
    type:String,
    required:true
},
  joiningDate:{
    type:Date,
    required:true,
    default:Date.now
  },
  department:{
    type:Schema.Types.ObjectId,
    ref:"Department"
  },
  timeTologIn:{
    type:Date
  },
  refreshtoken:{
    type:String
  },
  password:{
    type:String,
    required:[true , "password is required"]
  },
},{
    timestamps:true
});


employeeSchema.pre("save" , async function (next) {
  if(!this.isModified("password")){
    return 
  }
  this.password = await bcrypt.hash(this.password, 10 )
})

employeeSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


employeeSchema.methods.generateRefreshToken = async function () {
  return  jwt.sign(
    {
      _id:this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
employeeSchema.methods.generateAccessToken = async function () {
  return  jwt.sign(
    {
      _id:this.id,
      email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

export const Employee = mongoose.model("Employee" , employeeSchema);

