import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document{
    _id?: string,
    name: string,
    price: number,
    status: boolean,
    image: string,
    category_id: string
}

const productSchema = new Schema({
    name: {
        type: String,
        min: 3,
        required: true,
        unique: true
    },
    price: {
        type: String,
        min: 0.1,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        min: 3,
        required: true
    },
    category_id: {
        type: String,
        min: 3,
        required: true
    },
});

export default model<IProduct>('Product', productSchema)