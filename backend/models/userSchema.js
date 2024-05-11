import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
       firstName: {type: String, required: true},
       middleName: {type: String, required: false},
       lastName: {type: String, required: true},
       type: {type: String, required: true},
       email: {type: String, required: true},
       password: {type: String, required: true},
});

const User = mongoose.model('User', userSchema);

export { User };