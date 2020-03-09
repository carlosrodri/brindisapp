const sitesController = {}


sitesController.getCities = async (req, res) =>{
    readTextFile("server\datas\sites.json", function(text){
        res.json(JSON.parse(text))
        console.log(data);
    });

}

module.exports = sitesController;