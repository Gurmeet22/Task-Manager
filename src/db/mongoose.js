const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-1', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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

const Tasks = mongoose.model('Tasks', {
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

const Ragveer = new User({
    name: 'Ragveer Singh',
    email: 'gsinghs1998@gmail.com',
    password: 'Windowsten'
})

const task = new Tasks({
    description: 'Clean',
})

Ragveer.save().then((user) => {
    console.log(user)
}).catch((error) => {
    console.log(error)
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})