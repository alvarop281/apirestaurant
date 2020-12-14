import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    _id?: number,
    email: string,
    password: string,
    full_name?: string,
    dni: string,
    phone_number?: string,
    type_of_user?: string,
    full_address?: [
        {
            reference: string,
            address: string
        }
    ]
}

const userSchema = new Schema({
    email: {
        type: String,
        min: 4,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        min: 4,
        lowercase: true
    },
    dni: {
        type: String,
        required: true,
        min: 4,
        unique: true
    },
    phone_number: {
        type: String,
        default: ''
    },
    type_of_user: {
        type: String,
        default: 'buyer'
    },
    full_address: [
        {
            reference: {
                type: String
            },
            address: {
                type: String
            }
        }
    ]
});

export default model<IUser>('User', userSchema)