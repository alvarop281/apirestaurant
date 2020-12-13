import { Request, Response } from 'express'

// Model
import {findAllCategories} from '../models/Category/Repositories/category.repo';

export async function getCategories( req: Request, res: Response ){
    // Models
    const categories = await findAllCategories();

    return res.json(categories);
}