const State = require('../models/state');
const stateController = {}

stateController.getStatus = async (req, res) => {
    const status = await State.find();
    res.json(status);
}

stateController.createState = async (req, res) => {
    const state = new State(req.body);
    await state.save();
    console.log(state);
    res.json({
        'message': 'estado guardado'
    });
}

stateController.getStatusByShop = async (req, res) => {

    const status = await State.find({
        'shopId': req.params.shop
    })
    if (status[0] === undefined) {
        res.json({
            message: 'No hay estados'
        })
    } else {
        res.json({
            status: status
        })
    }
}

stateController.deleteState = async (req, res) => {

    const status = await State.find()
    status.forEach(element => {
        State.findByIdAndDelete(element._id)
    });
    // await State.findByIdAndDelete(req.params.id);
    res.json({
        status: 'State deleted'
    });
}

stateController.editState = async (req, res) => {
    const stateUpdated = {
        initHour: req.body.initHour,
        description: req.body.description,
        user: req.body.user
    }
    await State.findByIdAndUpdate(req.params.id, {
        $set: stateUpdated
    }, {
        new: true
    });
    res.json({
        status: 'States Updated'
    });
}

module.exports = stateController;