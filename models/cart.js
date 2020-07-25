const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );


module.exports = class Cart {
  
    static addProduct(id, productPrice) {
      fs.readFile(p, (err, fileContent) => {
        let cart = {products:[],totalPrice:0};
        if(!err) {
           cart = JSON.parse(fileContent);
        }

        //analyze cart
        const existingProductIndex = cart.products.findIndex((ele) => ele.id == id);
        const existingProduct = cart.products[existingProductIndex];

        let updatedproduct;
        if(existingProduct) {
            updatedproduct = {...existingProduct};
            updatedproduct.qty = updatedproduct.qty +1;

           cart.products = [...cart.products];
           cart.products[existingProductIndex] = updatedproduct;
        } else {
            updatedproduct = { id: id, qty:1};
            cart.products = [...cart.products,updatedproduct];
        }

        cart.totalPrice = cart.totalPrice + +productPrice;

        fs.writeFile(p,JSON.stringify(cart),(err) => {
            console.log(err);
        });

      });
    }
};