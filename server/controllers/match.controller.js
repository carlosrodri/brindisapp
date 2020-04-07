const Match = require('../models/match')
const matchController = {}

matchController.add = async (req, res) => {
    console.log('entraaaaaaaaaaaaaaaa');
    console.log('lo que llega   ' + req.body);
    
    
    const match = new Match(req.body)
    await match.save()

    res.json({
        status: 'succes',
        message: 'Un match nuevo se ha registrado'
    })
}

matchController.getMatches = async (req, res) => {
    const matches = await Match.find()
    res.json({
        matches: matches
    })
}

matchController.getMatchByShop = async (req, res) => {
    const matches = await Match.find({
        shopId: req - params.shopId
    })

    if (matches.length > 0) {
        res.json({
            status: 'succes',
            matches: matches
        })
    } else {
        res.json({
            status: 'error',
            message: 'No hay busquedas de tu bar'
        })
    }
}

module.exports = matchController