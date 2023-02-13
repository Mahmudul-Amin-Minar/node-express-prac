const productController = require('../controllers/productController');

const router = require('express').Router();

router.post('/add_product', productController.addProduct);
router.get('/all_product', productController.getAllProducts);
router.get('/published', productController.getPublishedProduct);
router.get('/one_product/:id', productController.getOneProduct);
router.put('/update_product/:id', productController.updateProduct);
router.delete('/delete_product/:id', productController.deleteProduct);

module.exports = router;