

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
    seasons: [String],
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
    seasons: [String],
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
    seasons: [String],
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
    seasons: [String],
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



// Battery Schema
const batterySchema = new Schema({
    title: String,
    slug: { type: String, unique: true },
    tyreType: String, // Type of tyre associated with the battery
    description: String,
    description1: String,
    price: Number,
    Salesprice: Number,
    Type: String,
    tyreBrand: [String],
    capacity: String, // e.g., in Ah (Ampere-hours)
    voltage: String, // e.g., in Volts
    batteryweight: String, // e.g., in kg
    batteryheight:String,
    batteryType: { type: String, required: true },  
    BatteryBrand: [String],
    BatteryModel: [String],
    warranty: String,
    quantity: Number,
    manufactureMonth: String,
    manufactureYear: Number,
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
    carbrand: [String], // Array of car brands
    carModel: [String], // Array of car models
    bikeBrand: [String], // Array of bike brands
    bikeModel: [String], // Array of bike models
}, { timestamps: true });

batterySchema.methods.getStatus = getStatus;


const Battery = mongoose.model('Battery', batterySchema);



// AlloyWheel Schema
const alloyWheelSchema = new Schema({
    title: String,
    slug: { type: String, unique: true },
    tyreType: String, // Type of tyre associated (if needed)
    alloywheelType: String ,
    description: String,
    description1: String,
    price: Number,
    Salesprice: Number,
    Type: String,
    tyreBrand: [String],
    seasons: [String],
    Color: String,
    WheelSize: String,
    Holes: String,
    PCD: String,
    alloywheelBrand: [String],
    alloywheelModel: [String],
    warranty: String,
    quantity: Number,
    manufactureMonth: String,
    manufactureYear: Number,
    material: String,
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
    carbrand: [String], // Array of car brands
    carModel: [String], // Array of car models
    bikeBrand: [String], // Array of bike brands
    bikeModel: [String], // Array of bike models
}, { timestamps: true });

alloyWheelSchema.methods.getStatus = getStatus;

const AlloyWheel = mongoose.model('AlloyWheel', alloyWheelSchema);


// Accessories Schema
const accessoriesSchema = new Schema({
    title: String,
    slug: { type: String, unique: true },
    tyreType: String, 
    tyreBrand: [String],
    accessoryType: String, 
    description: String,
    description1: String,
    price: Number,
    Salesprice: Number,
    Type: String,
    accessoryBrand: [String],
    accessoryModel: [String],
    warranty: String,
    quantity: Number,
    manufactureMonth: String,
    manufactureYear: Number,
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

accessoriesSchema.methods.getStatus = getStatus;

const Accessories = mongoose.model('Accessories', accessoriesSchema);



export { CarTyre, BikeTyre, TruckTyre, TractorTyre  , Battery , AlloyWheel , Accessories};
