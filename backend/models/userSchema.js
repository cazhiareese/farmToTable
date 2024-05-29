/**
* Schema for users.
* Represents the structure of a user, including their first name, middle name (optional), last name, type, email, and password.
*/

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
       firstName: {type: String, required: true},
       middleName: {type: String, required: false},
       lastName: {type: String, required: true},
       type: {type: String, required: true},
       email: {type: String, required: true},
       password: {type: String, required: true},
}, {versionKey: false});

const User = mongoose.model('User', userSchema);

export { User };