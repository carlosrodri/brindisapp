const Shop = require('../models/shop');
const shopController = {};

shopController.getShops = async (req, res) => {
    const shops = await Shop.find();
    res.json({
        shops: shops
    });
}

shopController.getShopById = async (req, res) => {
    const shop = await Shop.find({
        '_id': req.params.id
    })
    res.json({
        shop: shop
    })
}

shopController.addQualification = async (req, res) => {
    console.log('entra al back');
    
    Shop.findOneAndUpdate({
        _id: req.body['shopId']
    }, {
        $push: {
            qualificationList: req.body['number']
        }
    });
    res.json({
        message: 'Has calificado este bar'
    })
}

shopController.createShop = async (req, res) => {
    const shop = new Shop(req.body);
    await shop.save();
    res.json({
        status: 'succes',
        message: 'Bar creado con éxito',
        shop: shop
    });
}

shopController.getShopByMail = async (req, res) => {
    const shop = await Shop.find({
        'mail': req.params.mail
    });
    if (shop === undefined) {
        res.json({
            status: 'error',
            message: 'No hay bares con este mail'
        })
    } else {
        res.json({
            status: 'succes',
            shop: shop[0]
        });
    }
}

shopController.getShopByName = async (req, res) => {
    const shop = await Shop.find({
        'name': req.params.name
    });
    res.json(shop);
}

shopController.deleteShop = async (req, res) => {
    await Shop.findByIdAndDelete(req.params.id);
    res.json({
        'status': 'Shop deleted'
    });
}

shopController.editShop = async (req, res) => {
    const shopUpdated = {
        name: req.body.name,
        nickname: req.body.nickname,
        password: req.body.password,
        description: req.body.description,
        licenseNumber: req.body.licenseNumber,
        officeHours: req.body.officeHours,
        barKind: req.body.barKind
    }
    await Shop.findByIdAndUpdate(req.params.id, {
        $set: shopUpdated
    }, {
        new: true
    });
    res.json({
        'status': 'Shop updated'
    });
}

module.exports = shopController;