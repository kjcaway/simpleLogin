const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const Member = new Schema({
    userid: String,
    password: String,
    created: { type: Date, default: Date.now }
});

// generates hash
Member.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
Member.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports =  mongoose.model('member', Member);