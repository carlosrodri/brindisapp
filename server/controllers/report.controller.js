const Report = require('../models/report')
const reportController = {}

reportController.addReport = async (req, res) => {
    const report = new Report(req.body)
    await report.save()
    res.json({
        status: 'succes',
        message: 'Un Reporte de violsacion de privacidad nuevo se ha registrado'
    })
}

reportController.getReports = async (req, res) => {
    const reports = await Report.find()
    res.json({
        reports: reports
    })
}

module.exports = reportController;
