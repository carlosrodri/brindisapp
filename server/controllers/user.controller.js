const User = require('../models/user');
const userController = {};
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

userController.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

/**login  */
userController.signIn = async (req, res) => {
    const {
        mail,
        password
    } = req.body
    const user = await User.findOne({
        mail: mail
    })
    if (!user) {
        return res.json({
            status: 'error',
            message: 'Usuario no registrado'
        })
    }
    const passwordValidate = await user.confirmPassword(password)
    if (passwordValidate) {
        const token = jwt.sign({
            id: user._id
        }, config.secret, {
            expiresIn: 60 * 60 * 128
        })
        await res.json({
            status: 'succes',
            message: user.nickname,
            token: token,
            user: user
        })
    } else {
        res.json({
            status: 'error',
            message: 'contraseña incorrecta'
        })
    }
}

/**Crea un nuevo usuario y lo registra*/
userController.createUser = async (req, res) => {
    const user = new User(req.body);
    const {password} = req.body
    user.password = await encryptPassword(password)
    const userf = await User.findOne({
        mail: user.mail
    })
    if (userf) {
        res.json({status: 'error', message:'El correo está en uso'})
    } else {
        user.save()
        const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 60 * 72})
        res.json({status: 'succes', message: 'Usuario registrado con éxito', token: token, user: user });
    }
}

async function encryptPassword(password) {
    return bcrypt.hash(password, 10)
}

userController.getUserbyMail = async (req, res) => {
    console.log(req.params.mail);

    const user = await User.findOne({
        'mail': req.params.mail
    });
    res.json(user);
    console.log(user);

}

userController.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({
        status: 'User deleted'
    });
}

userController.editUser = async (req, res) => {
    const userUpdated = {
        name: req.body.name,
        nickname: req.body.nickname,
        password: req.body.password
    }
    await User.findByIdAndUpdate(req.params.id, {
        $set: userUpdated
    }, {
        new: true
    });
    res.json({
        status: 'Users Updated'
    });
}

module.exports = userController;