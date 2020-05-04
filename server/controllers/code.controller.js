const Code = require('../models/code')
const codesController = {}

codesController.getCode = async (req, res) => {
    const code = await Code.findOne({
        code: req.params.code
    })
    if (code === null) {
        res.json({
            status: 'error',
            message: 'Código no válido'
        })
    } else {
        res.json({
            staus: 'succes',
            message: 'Código validado',
        })
    }
}

codesController.getCodes = async (req, res) => {
    const codes = await Code.find()
    if (codes === undefined) {
        res.json({
            status: 'error',
            message: 'No hay códigos'
        })
    } else {
        res.json({
            codes: codes
        })
    }
}

codesController.createCode = async (req, res) => {
    const code = new Code(req.body);
    await code.save();
    res.json({
        status: 'succes',
        message: 'Código creado con éxito',
        code: code
    });
}

codesController.deleteCode = async (req, res) => {
    await Code.findByIdAndDelete(req.params.id)
    res.json({
        status: 'succes',
        message: 'Code dropped succes'
    })
}

module.exports = codesController;