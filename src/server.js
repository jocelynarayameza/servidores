import express from "express";
import ProductManager from "./manager/manager.js";

const productManager = new ProductManager("./manager/nuevoProducto.json");

const app = express();

app.get("/productos", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const { limit } = req.query;
    if (limit) {
      const productsFilter = products.slice(0, parseInt(limit));
      res.status(200).json(productsFilter); 
    } else {
      res.status(200).json(products); 
    }
  } catch (error) {
    res.status(500).json({ msg:"Error" });
  }
}); 

app.get("/productos/:id", async (req, res)=>{
  try{
    const products = await productManager.getProducts();
    const { id } = req.params;
    const producto = products.find(p => p.id === (id))
    if(!producto) {res.status(404).json({msg: 'Producto no encontrado'})}
    else res.json(producto)
  } catch(error) {
    res.status(500).json({msg: "Error"})
  }
})

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

   
