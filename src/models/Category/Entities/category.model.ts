import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document{
    _id?: string,
    description: string
}

const categorySchema = new Schema({
    description: {
        type: String,
        min: 3,
        required: true,
        unique: true
    }
});

export default model<ICategory>('Category', categorySchema)