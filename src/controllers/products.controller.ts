import { Request, Response } from 'express'

// Model
import { findAllProducts } from '../models/Product/Repositories/product.repo';

export async function getProducts( req: Request, res: Response ){
    const id = req.params.categoryId;

    // Models
    const products = await findAllProducts(id);

    return res.json(products);
}