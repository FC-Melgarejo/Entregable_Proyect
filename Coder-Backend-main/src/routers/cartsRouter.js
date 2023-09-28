const { Router } = require('express');
const cartsController = require('../controllers/cartsController');

const cartsRouter = Router();

cartsRouter.get('/', cartsController.getCarts);
cartsRouter.get('/:cid', cartsController.getCartById);
 cartsRouter.post('/', cartsController.addToCart); 
cartsRouter.post('/:cid/:pid', cartsController.addProductToCart);
cartsRouter.delete('/:cid/products/:pid', cartsController.removeProductFromCart);
cartsRouter.put('/:cid', cartsController.updateCart);
cartsRouter.put('/:cid/products/:pid', cartsController.updateProductQuantity);
cartsRouter.delete('/:cid', cartsController.clearCart);

module.exports = cartsRouter;




