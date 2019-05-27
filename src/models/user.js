const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({
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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

schema.pre('save', async function(next){
    const user = this
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

schema.methods.genAuthToken = async function(){
    const token = jwt.sign({ _id: this._id.toString() }, 'thisismytoken')
    this.tokens.push({token})
    await this.save()
    return token
}

schema.statics.findUser = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    if(!bcrypt.compare(password, user.password)){
        throw new Error('Unable to login')
    }
    return user
}

const User = mongoose.model('User', schema)


module.exports = User