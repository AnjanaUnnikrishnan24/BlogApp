import express,{json} from "express";
import mongoose from "mongoose";
import blogRoutes from "./Routes/blogRoutes.js"
import dotenv from 'dotenv';
import cors from 'cors'


const app = express();

dotenv.config();

app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(json());

app.use('/',blogRoutes);


mongoose.connect('mongodb://localhost:27017/Blog').then(()=>{
    console.log("Mongodb connected Successfully to Blog Website");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
})

app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
})