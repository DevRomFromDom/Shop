import mongoose, { Schema, model, Document } from "mongoose";

interface IProduct extends Document {
    _id: any;
    name: string;
    description: String;
    parameters: {
        price: {
            type: Number;
        };
        color: {
            type: String;
        };
        brand: {
            type: String;
        };
        modelYear: {
            type: Number;
        };
        condition: {
            type: String;
        };
    };
}

const ProductSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: {
        type: String,
        unique: false,
    },
    parameters: {
        price: {
            type: Number,
        },
        color: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        modelYear: {
            type: Number,
        },
        condition: {
            type: String,
        },
    },
});

const Product = model<IProduct>("Product", ProductSchema);
export default Product;
