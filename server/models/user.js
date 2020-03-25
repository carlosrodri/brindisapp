const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    mail: String,
    name: String,
    nickname: String,
    password: String,
    imageUrl: String
});

userSchema.method.encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

userSchema.methods.confirmPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema);