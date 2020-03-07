const express = require('express');
const router = express.Router();

const favoriteShop = require('../controllers/favoriteShop.controller');

router.get('/events', favoriteShop.getFavoriteByEvent) ;
router.get('/users', favoriteShop.getFavoriteByUser) ;
router.post('/', favoriteShop.addFavorite);

module.exports = router;