import { Express } from "express";
import Data from "./Data"

const app = express();

app.get("/api/product",(req,res)=>{
    res.send(Data.products);
})