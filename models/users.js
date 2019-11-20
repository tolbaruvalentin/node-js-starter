const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
}, { timestamps: true });


module.exports = User = mongoose.model('user', userSchema);