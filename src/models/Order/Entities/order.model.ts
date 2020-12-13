import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document{
    status?: string,
    payment_type?: string,
    proof_of_payment?: string,
    delivery_method?: string,
    commentary?: string,
    calification?: number,
    user_id: string,
    full_address?: {
        reference: string,
        address: string
    }
}

const orderSchema = new Schema({
    status: {
        type: String,
        default: 'active'
    },
    payment_type: {
        type: String,
        default: ''
    },
    proof_of_payment: {
        type: String,
        default: ''
    },
    delivery_method: {
        type: String,
        default: ''
    },
    commentary: {
        type: String,
        default: ''
    },
    calification:  {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    user_id: {
        type: String,
        required: true
    },
    full_address: {
        reference: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
    }
    
}); 

export default model<IOrder>('Order', orderSchema);