const mongoose = require('mongoose');
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        max: 100,
        validate(value){
            if(value<0){throw new Error('Age cannot be negative')}
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){throw new Error('Not an email')}
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value){
            if(validator.equals(value.toLowerCase(), 'password')){throw new Error('Weak Password')}
        }
    }
})

module.exports = User