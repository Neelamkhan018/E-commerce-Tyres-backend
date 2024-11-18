
import mongoose from "mongoose";

const { Schema } = mongoose;

// CarTyre Schema
const carTyreSchema = new Schema({
    title: String,
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
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

// Instance method to determine if the tyre is new or on sale
carTyreSchema.methods.getStatus = function () {
    const isNew = (new Date() - this.createdAt) < 30 * 24 * 60 * 60 * 1000; // Check if added within the last 30 days
    const isOnSale = this.Salesprice < this.price;
    
    return {
        status: isNew ? 'New' : (isOnSale ? 'On Sale' : 'Regular Price')
    };
};

const CarTyre = mongoose.model('CarTyre', carTyreSchema);

// BikeTyre Schema
const bikeTyreSchema = new Schema({
    title: String,
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
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

// Instance method to determine if the tyre is new or on sale
bikeTyreSchema.methods.getStatus = function () {
    const isNew = (new Date() - this.createdAt) < 30 * 24 * 60 * 60 * 1000; // Check if added within the last 30 days
    const isOnSale = this.Salesprice < this.price;
    
    return {
        status: isNew ? 'New' : (isOnSale ? 'On Sale' : 'Regular Price')
    };
};

const BikeTyre = mongoose.model('BikeTyre', bikeTyreSchema);

export { CarTyre, BikeTyre };

