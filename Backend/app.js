import express from "express";
import { connection } from "./dbconfig.js";
import { ObjectId } from "mongodb";
const app = express();
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();



app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
app.use(cookieParser())


app.post("/add-task", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection("data");
  const result = await collection.insertOne(req.body);
  if (result) {
    res.send({ message: "new task added", success: true, result });
  } else {
    res.send({ message: " task not added", success: false, result });
  }
});

app.get("/tasks",verifyJWTToken, async (req, res) => {
  const db = await connection();
  console.log('cookies test',req.cookies['token']);
  const collection = await db.collection("data");
  const result = await collection.find().toArray();
  if (result) {
    res.send({ message: "task list fetched", success: true, result });
  } else {
    res.send({ message: "error try after some time ", success: false });
  }
});


app.get("/task/:id", async (req, res) => {
  const db = await connection();

  const collection = await db.collection("data");
  const id = req.params.id;
  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ message: "task list fetched", success: true, result });
  } else {
    res.send({ message: "error try after some time", success: false });
  }
});

app.delete("/delete/:id", verifyJWTToken, async (req, res) => {
  const id = req.params.id;
  const db = await connection();
  const collection = await db.collection("data");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ message: "task deleted", success: true, result });
  } else {
    res.send({ message: "error try after sometime", success: false });
  }
});

app.put("/update-task",  async (req, res) => {
  const db = await connection();
  const collection = await db.collection("data");
  const { _id, ...fields } = req.body;
  const update = { $set: fields };
  console.log(fields);
  //console.log(req.body);

  const result = await collection.updateOne({ _id: new ObjectId(_id) },update);
  // res.send("test");
  if (result) {
    res.send({ message: "task data fetched", success: true, result });
  } else {
    res.send({ message: "try after some time", success: "false" });
  }
});

app.delete("/delete-multiple",verifyJWTToken, async (req, res) => {
  const db = await connection();
  const ids = req.body;
  const deleteTaskIds = ids.map((item) => new ObjectId(item));
  console.log(ids);

  const collection = await db.collection("data");
  const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } });
  if (result) {
    res.send({ message: "task deleted", success: result });
  } else {
    res.send({ message: "error try after sometime", success: false });
  }
});

app.post("/signup", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.insertOne(userData);
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        res.send({ success: "true", msg: "signup done", token });
      });
    }
  } else {
    res.send({
      success: false,
      msg: "signup not done",
    });
  }
  
});


function verifyJWTToken(req,res,next)
{
  console.log('verifyJWTToken',req.cookies['token']);
  const token=req.cookies['token'];

  jwt.verify(token,'Google',(error,decoded)=>
  {
    if(error)
    {
      return res.send({
        msg:"invalid token",
        success:false
      })
    }
    console.log(decoded);
    next();
    
  })
 

}

app.post("/login", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        res.send({ 
        success: "true", 
        msg: "login done", 
        token 
      });
      });
    }
    else {
    res.send({
      success: false,
      msg: "user not found",
    });
  }
  } else {
    res.send({
      success: false,
      msg: "login not done",
    });
  }
  
});


const port=process.env.PORT;
app.listen(port, () => {
  console.log("Server started");
});
