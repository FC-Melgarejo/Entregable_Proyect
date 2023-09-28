const { Router } = require('express');
const producstController = require('../controllers/productsController'); 

const productsRouter = new Router();

productsRouter.get('/', producstController.getProducts);
productsRouter.post('/', producstController.addProduct);
productsRouter.put('/:pid', producstController.updateProduct);
productsRouter.delete('/:pid', producstController.deleteProduct);

module.exports = productsRouter;




