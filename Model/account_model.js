const mongoose = require('../connection');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountNumber: { 
    validate:{
      validator: (v)=>{
        return /^\d{10}$/.test(v)
      },
      msg : props => `account number should be 10 digit long`

    },
    type: String, unique: true, required: true 
  },
  sortCode: { 
    type: String, required: true ,
    validate:{
      validator : (v) =>{
        return /^[a-zA-Z0-9]{1,8}$/.test(v)
      },
      msg: props => "IFSC/sort Code  can have 1 to 8 digits"
    }
    
  },
  activationStatus: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  allowCredit: { type: Boolean, default: true },
  allowDebit: { type: Boolean, default: true },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('Account', accountSchema);
