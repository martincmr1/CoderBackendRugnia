const fs = require('fs')
const products=[]

class ProductManager {
    
    path
    idProduct=0
    codeProduct=0
    constructor(file){
        this.path= `${process.cwd()}/${file}`
    }
    async addProduct(product){
        try { 
            const { id, title, description, price, thumbnail,code,stock } = product
            const infoProduct = {                
               id:++this.idProduct,
                title,
                description,
                price,
                thumbnail,
                code:++this.codeProduct,
                stock,
            }
         //   const products = []
            products.push(infoProduct)
            if (fs.existsSync(this.path)) {
                await fs.promises.appendFile(this.path, JSON.stringify(products));
              } else {
                await fs.promises.writeFile(this.path, JSON.stringify(products));
              }        
              return infoProduct;      
        } catch (error) {
            console.log(error)            
        }
    }
    async getProducts() {
        try {
          if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const product = JSON.parse(data)
            return product
          }
        return console.log(product)
        } catch (error) {
          console.log(error)
        }
      }
      async getProductById(id) {
        try {
          const data = await fs.promises.readFile(this.path, 'utf-8');
          const product = JSON.parse(data);
          return product.find(product => product.id === id) || console.log('id no encontrado');
        } catch (error) {
         console.error('Error al leer el archivo:', error);
          return null;
        }
      }
      async updateProduct(id, updatedFields) {
        try {
          const products = await this.getProducts();
          const productIndex = products.findIndex(product => product.id === id);
    
          if (productIndex !== -1) {
            const updatedProduct = {
              ...products[productIndex],
              ...updatedFields,
            }; 
            products[productIndex] = updatedProduct;    
            await fs.promises.writeFile(this.path, JSON.stringify(products));    
            return updatedProduct;
          }    
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
      async deleteProduct(id) {
        try {
          const data = await fs.promises.readFile(this.path, 'utf-8');
          const products = JSON.parse(data);
      
          const index = products.findIndex(product => product.id === id);
          if (index !== -1) {
            products.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log('Producto eliminado');
          } else {
            console.log('ID no existe');
          }
        } catch (error) {
          console.error('Error en el archivo:', error);
        }
      }     
    }
    
const productManager = new ProductManager('Productos.json')




/////////testing addProduct//////////////////////
/*
const product = {
    title : 'Celular',
    description:'A20',  
    price:200,
    thumbnail:'www.imagen.jpg',
    stock:20, 
}



const product2 = {
  title : 'Celular',
  description:'A30',  
  price:500,
  thumbnail:'www.imagen.jpg',
  stock:20, 
}
productManager.addProduct(product)
productManager.addProduct(product2)

*/
/////////////testing getProducts//////////////////////////////////////////////////////
/*
productManager
  .getProducts()
  .then(products => console.log(products))
  .catch(err => console.log(err));
*/


//////////////testing getProductsById///////////////////////////////////////
/*
const productId = 2;
productManager
 .getProductById(productId)
 .then(product => {
  if (product) {
    console.log('Producto encontrado:', product);
      } else {
     console.log('Producto no encontrado.');
      }
    })
    .catch(err => console.log(err));
*/


//////////////////testing updateProduct/////////////////////
/*  
const productId = 2;
    const updatedFields = {
        title: 'estufa',
        price: 6500,
      };
productManager
  .updateProduct(productId, updatedFields)
  .then(updatedProduct => {
   if (updatedProduct) {
   console.log('Producto actualizado:', updatedProduct);
    } else {
    console.log('Producto no encontrado.');
    }
   })
  .catch(err => console.log(err));
*/


///////////////////testing deleteProduct//////////////////////
/*
productManager.deleteProduct(2)
*/





