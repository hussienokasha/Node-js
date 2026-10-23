
import dotenv from 'dotenv'
dotenv.config({path:'./config.env'})
import app from "./app.js";

import mongoose from 'mongoose'

mongoose.connect(process.env.CONN_STR).then((conn)=>{
  console.log(conn)
  console.log("connection to remote DB established successfully")
}).catch((error)=>{
  console.log(error)
})

const movieSchema = new mongoose.Schema({name:{
  type:String,
  required:true,
}})
const model = mongoose.model('movie',movieSchema)

const port = process.env.PORT || 3000


app.listen(port, () => {
  console.log("server hosted on port " + port);
});
