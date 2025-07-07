const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User' 
  },
  addressLine1: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  pincode : {
    type: String,
    required: true,
    maxlength: 6,
    minlength: 6, 
    validate: {
      validator: function (value) {
        return /^[0-9]{6}$/.test(value); 
      },
      message: 'Postcode must be exactly 6 digits.'
    }
  }
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
