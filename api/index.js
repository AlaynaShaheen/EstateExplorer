import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.router.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>
{
    console.log("connected to database");
}).catch((err)=>
{
    console.log(err);
});

const __dirname =path.resolve();

const app=express();

app.use(express.json());
app.use(cookieParser());
app.listen(3000,(req,res)=>
{
    console.log("server running on port 3000 !");
}
);
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter);
app.use(express.static(path.join(__dirname,'/client/dist')));
// app.use(express.static(path.join(__dirname,'/client/dist')));
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'client','dist','index.html'));
// })
app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,'client','dist','index.html'));
       
});
app.use((err,req,res,next)=>
{    
     const statusCode=err.statusCode ||500;
     const message=err.message ||500 ;
     return res.status(statusCode).json(
        {
             success:false,
             statusCode,
             message,
        }
     );
});