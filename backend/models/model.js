import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: { type: String, required: true },
    datetime: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true
});


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    events: [eventSchema]
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const Event = mongoose.model('Event', eventSchema);
const User = mongoose.model('User', userSchema);

export {Event, User};