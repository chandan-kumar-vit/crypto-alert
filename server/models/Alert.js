const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlertsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    crypto:{
        type: String,
        required: true
    },
    minAmt:{
        type: Number,
        required: true,
        default:0 
    },
    maxAmt:{
        type: Number,
        required: true
    },
    status:{
        type:String,
        required:true,
        default:'active'
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('alerts',AlertsSchema);