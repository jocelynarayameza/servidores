import fs from "fs";
import { v4 as uuidv4 } from "uuid";


export default class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productos = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(productos);
            } else return [];
        } catch (error) {
            console.log(error);
        }

    }


    async addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !code || !description || !price || !thumbnail || !stock) {
            console.error("Faltan elementos")
        }
        try {
            const productos = await this.getProducts();
            let newId = uuidv4();
            const nuevoProducto = {
                id: newId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            productos.push(nuevoProducto);
            await fs.promises.writeFile(this.path, JSON.stringify(productos));
        } catch (error) {
            console.log(error);
        }
    }
    async getProductsById(id) {
        try {
            const productos = await this.getProducts();
            for (let i = 0; i < productos.length; i++) {
                if (productos[i].id === id) {
                    return productos[i];
                }
            }
        } catch {
            console.log("No se encontro el producto");
        }
    }

    async updateProduct(id, propiedad, valor) {
        try {
            const productos = await this.getProducts(id);
            const index = productos.findIndex(producto => producto.id === id);

            if (!productos) {
                console.log("No se encontro el producto");
            }
            productos[index][propiedad] = valor;
            await fs.promises.writeFile(this.path, JSON.stringify(productos));

        } catch (error) {
            console.log(error);

        }
    }

    async deleteProduct(id) {
        try {
            const productos = await this.getProducts();
            const index = productos.findIndex(producto => producto.id === id);
            productos.splice(index, 1);
            console.log(`Producto con id ${id} ha sido eliminado`);

            await fs.promises.writeFile(this.path, JSON.stringify(productos));

        } catch {
            console.log("No se encontro el producto");
        }

    }
}

