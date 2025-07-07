const Doctor = require("../models/doctorModel");
const Rating = require("../models/ratingModel")

const rateDoctor = async ({ doctorId, rating, comment, userId }) => {
    const existing = await Rating.findOne({ doctorId, userId });
    if (existing) {
      throw new Error("You have already rated this doctor");
    }
  
    const newRating = new Rating({
      doctorId,
      userId,
      rating,
      comments: comment
    });
  
    await newRating.save();
  
    const allRatings = await Rating.find({ doctorId });
  
    const total = allRatings.reduce((sum, r) => sum + r.rating, 0);
    const average = (total / allRatings.length).toFixed(1); 
  
    await Doctor.findByIdAndUpdate(doctorId, { ratings: average });
  
    return newRating;
  };



module.exports = {rateDoctor}