import express from "express";
import cors from "cors"
const app = express();

//basic default middleware
//we can setup custom also
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit:"16kb"}))
app.use(express.static("public"))


//cors config
app.use(cors({
  origin : process.env.CORS_ORIGIN?.split(",") || "http://locahost:5173",
  credential:true,
  methods:["GET","POST", ,"PUT" , "PATCH","DELETE","OPTIONS"],
  allowedHeaders:["Authorization","Content-Type"]
}))




//importing routes

import healthCheckRouter from "./routes/healthCheck.routes.js";


app.use("/api/v1/healthcheck",healthCheckRouter)
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})



export default app;