
const Rating = require('../models/ratingModel')
const {fetchRatings, rateDoctor} = require('../services/ratingService')

const getRatings = async(req, res)=>{
    const doctorId = req.params.doctorId
    try{
        const ratings = await fetchRatings(doctorId)   
        res.status(200).json(ratings);
     
    }catch(err){
        res.status(500).json({ error: "Failed to fetch ratings" });
    }
}

const addRating = async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      const { rating, comment } = req.body;
      const userId = req.user.id;
  
      const newRating = await rateDoctor({ doctorId, rating, comment, userId });
  
      res.status(201).json({
        message: "Rating submitted",
        data: newRating
      });
    } catch (err) {
      res.status(400).json({ error: err.message || "Failed to add rating" });
    }
  };

module.exports = {getRatings, addRating}
