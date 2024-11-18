import mongoose from "mongoose";

const BankSchema = new mongoose.Schema({
    accountholdername:String,
    bankAccount:Number,
    ifsc:String,
    accounttype:String,
    reenteraccountnumber:Number

});

const Bankmodel = mongoose.model('Bankmodeluser', BankSchema);
export default Bankmodel;