import mongoose from "mongoose";

// const BankSchema = new mongoose.Schema({
//     accountholdername:String,
//     bankAccount:Number,
//     ifsc:String,
//     accounttype:String,
//     reenteraccountnumber:Number

// });

// const Bankmodel = mongoose.model('Bankmodeluser', BankSchema);


// export default Bankmodel;


const BankSchema = new mongoose.Schema({
    clientId: { type: String, required: true, ref: "dealerregister" }, 
    
    accountholdername: String,
    bankAccount: Number,
    ifsc: String,
    accounttype: String,
    reenteraccountnumber: Number
});

const Bankmodel = mongoose.model('Bankmodeluser', BankSchema);


export default Bankmodel;
