import {MongoClient} from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
const url=process.env.MongoURL;
//const url="mongodb+srv://Arindam:8942868705@cluster0.e9uzeqi.mongodb.net/?appName=Cluster0";
const dbName="TodoApp";
export const client=new MongoClient(url)
const collectionName="data"
export const connection = async()=>
{
    const connect= await client.connect();
    return await connect.db(dbName)
}


