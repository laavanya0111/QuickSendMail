import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    }, 
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
    },
    text: {
        type: String,
        required: true
    }
})

export const Email = mongoose.model('Email', emailSchema);