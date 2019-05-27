const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        default: false,
        type: Boolean
    }
})


const Tasks = mongoose.model('Tasks', schema)

module.exports = Tasks