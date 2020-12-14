import { Request, Response } from 'express'

// Model
import { 
    findAllCategories, 
    createUser, 
    updateACategory,
    findACategoryById,
    deleteCategoryById } from '../models/Category/Repositories/category.repo';

export async function getCategories( req: Request, res: Response ){
    // Models
    const categories = await findAllCategories();

    return res.json(categories);
}

export async function createCategories( req: Request, res: Response ){
    const description = req.body.description;

    const category = await createUser(description)
    
    return res.json(category);
}

export async function updateCategory( req: Request, res: Response ){
    const categoryId = req.params.categoryId;
    const description = req.body.description;

    const category = await updateACategory( categoryId, description);

    if( !category ) return res.status(404).json({ message: "Category not found!" });
    
    return res.json({ message: "Category updated" });
}

export async function deleteCategory( req: Request, res: Response ){
    const categoryId = req.params.categoryId;

    const category = await findACategoryById( categoryId );

    if( !category ) return res.status(404).json({ message: "Category not found!" });

    await deleteCategoryById( categoryId )
    
    return res.json({ message: "Category deleted" });
}