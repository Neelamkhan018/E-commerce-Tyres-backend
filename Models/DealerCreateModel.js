

import mongoose from 'mongoose';

const DealerCreateAccount = new mongoose.Schema({
    clientId: { type: String, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
    username: { type: String, required: true },
    mobileNumber: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpiration: { type: Date }, 
    joinDate: { type: Date, default: () => new Date() },  
    
});


const dealeraccountModel = mongoose.model('dealerregister', DealerCreateAccount);

export default dealeraccountModel;
