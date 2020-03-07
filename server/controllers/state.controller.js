const State = require('../models/State');
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
        'status': 'estado guardado'
    });
}

stateController.getStatebyMail = async (req, res) => {
    console.log(req.params.mail);
    
    const state = await State.find( {'mail': req.params.mail} );
    res.json(state);
    console.log(state);
    
}

stateController.deleteState = async (req, res) => {
    console.log(req.params.id);
    
    await State.findByIdAndDelete(req.params.id);
    res.json({status: 'State deleted'});
}

stateController.editState = async (req, res) => {
    const stateUpdated = {
        initHour: req.body.initHour,
        description: req.body.description,
        user: req.body.user
    }
    await State.findByIdAndUpdate(req.params.id, { $set: stateUpdated }, { new: true });
    res.json({ status: 'States Updated' });
}

module.exports = stateController;