const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        required: true,
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = Task