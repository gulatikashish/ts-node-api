const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment=require('moment')
const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: function(v) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v,
        );
      },
      message: '{VALUE} is not a valid email!',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password in required'],
  },
 
  account_address:{
    type: String,
  },
  account_balance:{
    type: Number,
    default:0
  },
  private_key:{
    type: String,
  },
  tokens:{
    type: Number,
    default:0
  },
  role:{
    type : String,
    enum: ['ADMIN', 'SERVER_MANAGER','USER'],
    required : true,
  },
  created_at:{
    type:String,
    default:moment().format()
  }

});
// userSchema.plugin(lastMod);
export const User = mongoose.model('User', userSchema);

