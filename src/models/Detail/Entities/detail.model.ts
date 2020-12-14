import { Schema, model, Document } from 'mongoose';

export interface IDetail extends Document{
    ordered_quantity: number,
    unite_price: number,
    total_by_product: number,
    product_id: string,
    order_id: string
}

const detailSchema = new Schema({
    ordered_quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unite_price: {
        type: Number,
        min: 0
    },
    total_by_product: {
        type: Number,
        min: 0
    },
    product_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    }
});

export default model<IDetail>('Detail', detailSchema);