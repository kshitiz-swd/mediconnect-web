
const mongoose = require('mongoose')

const {Schema} = mongoose

const ratingSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Doctor"
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comments:{
        type: String,
        trim: true
    },
},{timestamps: true})



const Rating = mongoose.model("Rating", ratingSchema)

module.exports = Rating