import mongoose from 'mongoose';

const AccinfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  MobileNumber: { type: Number, required: true },
  email:{type : String , required:true}

});

const Accinfo = mongoose.model('Accinfomodel', AccinfoSchema);

export default Accinfo;