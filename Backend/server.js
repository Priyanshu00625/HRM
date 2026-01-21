
import connectDB from "./src/db/index.js";
import dotenv from "dotenv"
import {app} from "./src/app.js"
dotenv.config({
    path: './.env'
})


const port = process.env.PORT

connectDB().then(
    app.listen(port , ()=>{
        console.log(`server is running on port : ${port}`);
    })
).catch((err)=>{
    console.log("mongodb connection faild !!! " , err);
})