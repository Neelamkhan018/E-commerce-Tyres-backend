


// import mongoose from "mongoose";

// const { Schema } = mongoose;

// // CarTyre Schema
// const carTyreSchema = new Schema({
//     title: String,
//     slug: { type: String, unique: true }, // Added slug field
//     tyreType: String,
//     description: String,
//     description1: String,
//     price: Number,
//     Salesprice: Number,
//     Type: String,
//     carbrand: [String],
//     carModel: [String],
//     tyreBrand: [String],
//     width: Number,
//     height: Number,
//     customs: Number,
//     seasons: String,
//     speedRating: String,
//     loadCapacity: Number,
//     material: String,
//     manufactureMonth: String,
//     manufactureYear: Number,
//     warranty: String,
//     quantity: Number,
//     avatarImages: { type: String },
//     thumb1Images: { type: String },
//     thumb2Images: { type: String },
//     thumb3Images: { type: String },
//     thumb4Images: { type: String },
//     thumb5Images: { type: String },
//     thumb6Images: { type: String },
//     addresses: [{
//         state: String,
//         city: String,
//         pinCode: String,
//         details: String,
//     }],
//     active: {
//         type: Boolean,
//         default: true,
//     },
// }, { timestamps: true });

// // Instance method to determine if the tyre is new or on sale
// carTyreSchema.methods.getStatus = function () {
//     const isNew = (new Date() - this.createdAt) < 30 * 24 * 60 * 60 * 1000; // Check if added within the last 30 days
//     const isOnSale = this.Salesprice < this.price;
    
//     return {
//         status: isNew ? 'New' : (isOnSale ? 'On Sale' : 'Regular Price')
//     };
// };

// const CarTyre = mongoose.model('CarTyre', carTyreSchema);

// // BikeTyre Schema
// const bikeTyreSchema = new Schema({
//     title: String,
//     slug: { type: String, unique: true }, // Added slug field
//     tyreType: String,
//     description: String,
//     description1: String,
//     price: Number,
//     Salesprice: Number,
//     Type: String,
//     bikeBrand: [String],
//     bikeModel: [String],
//     tyreBrand: [String], 
//     width: Number,
//     height: Number,
//     customs: Number,
//     seasons: String,
//     speedRating: String,
//     loadCapacity: Number,
//     fronttyre: String,
//     reartyre: String,
//     material: String,
//     manufactureMonth: String,
//     manufactureYear: Number,
//     warranty: String,
//     quantity: Number,
//     avatarImages: { type: String },
//     thumb1Images: { type: String },
//     thumb2Images: { type: String },
//     thumb3Images: { type: String },
//     thumb4Images: { type: String },
//     thumb5Images: { type: String },
//     thumb6Images: { type: String },
//     addresses: [{
//         state: String,
//         city: String,
//         pinCode: String,
//         details: String,
//     }],
//     active: {
//         type: Boolean,
//         default: true,
//     },
// }, { timestamps: true });

// // Instance method to determine if the tyre is new or on sale
// bikeTyreSchema.methods.getStatus = function () {
//     const isNew = (new Date() - this.createdAt) < 30 * 24 * 60 * 60 * 1000; // Check if added within the last 30 days
//     const isOnSale = this.Salesprice < this.price;
    
//     return {
//         status: isNew ? 'New' : (isOnSale ? 'On Sale' : 'Regular Price')
//     };
// };

// const BikeTyre = mongoose.model('BikeTyre', bikeTyreSchema);

// export { CarTyre, BikeTyre };



















// import mongoose from "mongoose";

// const { Schema } = mongoose;

// // CarTyre Schema
// const carTyreSchema = new Schema({
//     title: String,
//     slug: { type: String, unique: true },
//     tyreType: String,
//     description: String,
//     description1: String,
//     price: Number,
//     Salesprice: Number,
//     Type: String,
//     carbrand: [String],
//     carModel: [String],
//     tyreBrand: [String],
//     width: Number,
//     height: Number,
//     customs: Number,
//     seasons: String,
//     speedRating: String,
//     loadCapacity: Number,
//     material: String,
//     manufactureMonth: String,
//     manufactureYear: Number,
//     warranty: String,
//     quantity: Number,
//     avatarImages: { type: String },
//     thumb1Images: { type: String },
//     thumb2Images: { type: String },
//     thumb3Images: { type: String },
//     thumb4Images: { type: String },
//     thumb5Images: { type: String },
//     thumb6Images: { type: String },
//     addresses: [{
//         state: String,
//         city: String,
//         pinCode: String,
//         details: String,
//     }],
//     active: { type: Boolean, default: true },
// }, { timestamps: true });

// carTyreSchema.methods.getStatus = function () {
//     const isNew = (new Date() - this.createdAt) < 30 * 24 * 60 * 60 * 1000;
//     const isOnSale = this.Salesprice < this.price;
//     return { status: isNew ? 'New' : (isOnSale ? 'On Sale' : 'Regular Price') };
// };

// const CarTyre = mongoose.model('CarTyre', carTyreSchema);

// // BikeTyre Schema
// const bikeTyreSchema = new Schema({
//     title: String,
//     slug: { type: String, unique: true },
//     tyreType: String,
//     description: String,
//     description1: String,
//     price: Number,
//     Salesprice: Number,
//     Type: String,
//     bikeBrand: [String],
//     bikeModel: [String],
//     tyreBrand: [String],
//     width: Number,
//     height: Number,
//     customs: Number,
//     seasons: String,
//     speedRating: String,
//     loadCapacity: Number,
//     fronttyre: String,
//     reartyre: String,
//     material: String,
//     manufactureMonth: String,
//     manufactureYear: Number,
//     warranty: String,
//     quantity: Number,
//     avatarImages: { type: String },
//     thumb1Images: { type: String },
//     thumb2Images: { type: String },
//     thumb3Images: { type: String },
//     thumb4Images: { type: String },
//     thumb5Images: { type: String },
//     thumb6Images: { type: String },
//     addresses: [{
//         state: String,
//         city: String,
//         pinCode: String,
//         details: String,
//     }],
//     active: { type: Boolean, default: true },
// }, { timestamps: true });

// bikeTyreSchema.methods.getStatus = function () {
//     const isNew = (new Date() - this.createdAt) < 30 * 24 * 60 * 60 * 1000;
//     const isOnSale = this.Salesprice < this.price;
//     return { status: isNew ? 'New' : (isOnSale ? 'On Sale' : 'Regular Price') };
// };

// const BikeTyre = mongoose.model('BikeTyre', bikeTyreSchema);

// // TruckTyre Schema
// const truckTyreSchema = new Schema({
//     title: String,
//     slug: { type: String, unique: true },
//     tyreType: String,
//     description: String,
//     description1: String,
//     price: Number,
//     Salesprice: Number,
//     Type: String,
//     truckBrand: [String],
//     truckModel: [String],
//     tyreBrand: [String],
//     width: Number,
//     height: Number,
//     customs: Number,
//     seasons: String,
//     speedRating: String,
//     loadCapacity: Number,
//     material: String,
//     manufactureMonth: String,
//     manufactureYear: Number,
//     warranty: String,
//     quantity: Number,
//     avatarImages: { type: String },
//     thumb1Images: { type: String },
//     thumb2Images: { type: String },
//     thumb3Images: { type: String },
//     thumb4Images: { type: String },
//     thumb5Images: { type: String },
//     thumb6Images: { type: String },
//     addresses: [{
//         state: String,
//         city: String,
//         pinCode: String,
//         details: String,
//     }],
//     active: { type: Boolean, default: true },
// }, { timestamps: true });

// truckTyreSchema.methods.getStatus = function () {
//     const isNew = (new Date() - this.createdAt) < 30 * 24 * 60 * 60 * 1000;
//     const isOnSale = this.Salesprice < this.price;
//     return { status: isNew ? 'New' : (isOnSale ? 'On Sale' : 'Regular Price') };
// };

// const TruckTyre = mongoose.model('TruckTyre', truckTyreSchema);


// export { CarTyre, BikeTyre, TruckTyre };






import mongoose from "mongoose";

const { Schema } = mongoose;

// Common getStatus method
function getStatus() {
    const isNew = (new Date() - this.createdAt) < 30 * 24 * 60 * 60 * 1000;
    const isOnSale = this.Salesprice < this.price;
    return { status: isNew ? 'New' : (isOnSale ? 'On Sale' : 'Regular Price') };
}

// CarTyre Schema
const carTyreSchema = new Schema({
    title: String,
    slug: { type: String, unique: true },
    tyreType: String,
    description: String,
    description1: String,
    price: Number,
    Salesprice: Number,
    Type: String,
    carbrand: [String],
    carModel: [String],
    tyreBrand: [String],
    width: Number,
    height: Number,
    customs: Number,
    seasons: String,
    speedRating: String,
    loadCapacity: Number,
    material: String,
    manufactureMonth: String,
    manufactureYear: Number,
    warranty: String,
    quantity: Number,
    avatarImages: { type: String },
    thumb1Images: { type: String },
    thumb2Images: { type: String },
    thumb3Images: { type: String },
    thumb4Images: { type: String },
    thumb5Images: { type: String },
    thumb6Images: { type: String },
    addresses: [{
        state: String,
        city: String,
        pinCode: String,
        details: String,
    }],
    active: { type: Boolean, default: true },
}, { timestamps: true });

carTyreSchema.methods.getStatus = getStatus;

const CarTyre = mongoose.model('CarTyre', carTyreSchema);

// BikeTyre Schema
const bikeTyreSchema = new Schema({
    title: String,
    slug: { type: String, unique: true },
    tyreType: String,
    description: String,
    description1: String,
    price: Number,
    Salesprice: Number,
    Type: String,
    bikeBrand: [String],
    bikeModel: [String],
    tyreBrand: [String],
    width: Number,
    height: Number,
    customs: Number,
    seasons: String,
    speedRating: String,
    loadCapacity: Number,
    fronttyre: String,
    reartyre: String,
    material: String,
    manufactureMonth: String,
    manufactureYear: Number,
    warranty: String,
    quantity: Number,
    avatarImages: { type: String },
    thumb1Images: { type: String },
    thumb2Images: { type: String },
    thumb3Images: { type: String },
    thumb4Images: { type: String },
    thumb5Images: { type: String },
    thumb6Images: { type: String },
    addresses: [{
        state: String,
        city: String,
        pinCode: String,
        details: String,
    }],
    active: { type: Boolean, default: true },
}, { timestamps: true });

bikeTyreSchema.methods.getStatus = getStatus;

const BikeTyre = mongoose.model('BikeTyre', bikeTyreSchema);

// TruckTyre Schema
const truckTyreSchema = new Schema({
    title: String,
    slug: { type: String, unique: true },
    tyreType: String,
    description: String,
    description1: String,
    price: Number,
    Salesprice: Number,
    Type: String,
    truckBrand: [String],
    truckModel: [String],
    tyreBrand: [String],
    width: Number,
    height: Number,
    customs: Number,
    seasons: String,
    speedRating: String,
    loadCapacity: Number,
    material: String,
    manufactureMonth: String,
    manufactureYear: Number,
    warranty: String,
    quantity: Number,
    avatarImages: { type: String },
    thumb1Images: { type: String },
    thumb2Images: { type: String },
    thumb3Images: { type: String },
    thumb4Images: { type: String },
    thumb5Images: { type: String },
    thumb6Images: { type: String },
    addresses: [{
        state: String,
        city: String,
        pinCode: String,
        details: String,
    }],
    active: { type: Boolean, default: true },
}, { timestamps: true });

truckTyreSchema.methods.getStatus = getStatus;

const TruckTyre = mongoose.model('TruckTyre', truckTyreSchema);

// TractorTyre Schema
const tractorTyreSchema = new Schema({
    title: String,
    slug: { type: String, unique: true },
    tyreType: String,
    description: String,
    description1: String,
    price: Number,
    Salesprice: Number,
    Type: String,
    tractorBrand: [String],
    tractorModel: [String],
    tyreBrand: [String],
    width: Number,
    height: Number,
    customs: Number,
    seasons: String,
    speedRating: String,
    loadCapacity: Number,
    material: String,
    manufactureMonth: String,
    manufactureYear: Number,
    warranty: String,
    quantity: Number,
    avatarImages: { type: String },
    thumb1Images: { type: String },
    thumb2Images: { type: String },
    thumb3Images: { type: String },
    thumb4Images: { type: String },
    thumb5Images: { type: String },
    thumb6Images: { type: String },
    addresses: [{
        state: String,
        city: String,
        pinCode: String,
        details: String,
    }],
    active: { type: Boolean, default: true },
}, { timestamps: true });

tractorTyreSchema.methods.getStatus = getStatus;

const TractorTyre = mongoose.model('TractorTyre', tractorTyreSchema);

export { CarTyre, BikeTyre, TruckTyre, TractorTyre };
