const State = require('../models/state');
const stateController = {}

stateController.getStatus = async (req, res) => {
    const status = await State.find();
    res.json({status: status});
}

stateController.createState = async (req, res) => {
    const state = new State(req.body);
    await state.save();
    console.log(state);
    res.json({
        'message': 'estado guardado'
    });
}

stateController.addLike = async (req, res) => {
    if (req.body.option === 'add') {
        await State.findByIdAndUpdate({
            _id: req.body.status
        }, {
            $push: {
                likeList: 1
            }
        });
        res.json({
            message: 'Te gusta este estado'
        })
    } else {
        await State.findByIdAndUpdate({
            _id: req.body.status
        }, {
            $pop: {
                likeList: -1
            }
        });
        res.json({
            message: 'Te gusta este estado'
        })
    }

}

stateController.addDontLike = async (req, res) => {
    if (req.body.option === 'add') {
        await State.findByIdAndUpdate({
            _id: req.body.status
        }, {
            $push: {
                dontLikeList: 1
            }
        });
        res.json({
            message: 'No gusta este estado'
        })
    } else {
        await State.findByIdAndUpdate({
            _id: req.body.status
        }, {
            $pop: {
                dontLikeList: -1
            }
        });
        res.json({
            message: 'No gusta este estado'
        })
    }

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
    console.log(req.params.id);

    await State.findByIdAndDelete(req.params.id);
    res.json({
        status: 'State deleted'
    });
}

stateController.getStatusById = async (req, res) => {
    const status = await State.findOne({
        _id: req.params.id
    })
    if (status !== undefined) {
        res.json({
            status: status
        })
    } else {
        res.json({
            status: 'error',
            message: 'No hay un estado en la base de datos'
        })
    }
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