const express = require('express');
const router = express.Router();

const shop = require('../controllers/shop.controller');

router.get('/', shop.getShops) ;
router.post('/', shop.createShop);
router.get('/mail/:mail', shop.getShopByMail);
router.get('/name/:name', shop.getShopByName);
router.get('/id/:id', shop.getShopById);
router.get('/city/:city', shop.getShopByCity);
router.delete('/:id', shop.deleteShop);
router.put('/:id', shop.editShop);
router.post('/qualification', shop.addQualification);

module.exports = router;