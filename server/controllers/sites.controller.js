const sitesController = {}
const fs = require('fs')

sitesController.getCities = async (req, res) =>{
    var content = fs.readFileSync("server/datas/sites.json");
    var jsonContent = JSON.parse(content)
   res.json(jsonContent)
}

module.exports = sitesController;