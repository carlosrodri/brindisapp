const sitesController = {}
const fs = require('fs')

sitesController.getCities = async (req, res) =>{
    var content = fs.readFileSync("server/datas/sites.json");
   res.json(content)
}

module.exports = sitesController;