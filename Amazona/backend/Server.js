import  express  from "express";
import Data from "./Data.js"

const app = express();

app.get('/api/product',(req,res)=>{
    res.send(Data.product);
})

app.get('/api/product/slug/:slug',(req,res)=>{
const product = Data.product.find((x)=>x.slug===req.params.slug);
  if(product) {
    res.send(product);
  } else{
    res.status(404).send({message:'product not found'})
  }
}) 

app.get('/api/product/:id',(req,res)=>{
  const product = Data.product.find((x)=>x.id===req.params.id);
    if(product) {
      res.send(product);
    } else{
      res.status(404).send({message:'product not found'})
    }
  }) 
const port=process.env.PORT || 5000;
app.listen(port , ()=>{
    console.log(`serve at http://localhost:${port}`);
})