import { Request, Response } from 'express'
import fs from 'fs';

// Model
import { 
    findAllProducts, 
    createAProduct, 
    findAProductByName,
    findAProductByIdAndCategoryId,
    deleteAProductById,
    updateAProduct,
    findAllPublicProducts } from '../models/Product/Repositories/product.repo';

// Interface
import { IProduct } from '../models/Product/Entities/product.model';

export async function getProducts( req: Request, res: Response ){
    const id = req.params.categoryId;

    // Models
    const products = await findAllProducts(id);

    return res.json(products);
}

export async function getPublicProducts( req: Request, res: Response ){
    const id = req.params.categoryId;

    // Models
    const products = await findAllPublicProducts(id);

    return res.json(products);
}

export async function createProduct( req: Request, res: Response ){
    // Save params
    const newProduct: IProduct = req.body;
    newProduct.category_id = req.params.categoryId;

    const verifiName = await findAProductByName(req.body.name);
    if( verifiName ) return res.status(400).json({ errors: 'The name was used!' });

    // Save and store image
    if(req.files){
        const image: any = req.files.image;
        newProduct['image'] = image.name;

        // Validate the file type
        if(image.mimetype !== 'image/png'){
            return res.status(400).json({ errors: 'The file type is invalid' });
        }

        // Store file
        image.mv('./uploads/' + image.name, function (error: any){
            if(error){
                return res.status(400).json({ errors: error });
            }
        });
    }
    
    const product = await createAProduct( newProduct );

    return res.status(201).json({
        product,
        message: 'Product created'
    });
}


export async function deleteProduct( req: Request, res: Response ){
    const categoryId = req.params.categoryId;
    const productId = req.params.productId;

    // Models
    const product = await findAProductByIdAndCategoryId( productId, categoryId );
    if ( !product ) return res.status(404).json({ errors: 'Product not found!' });

    const oldImg: string = product.image;

    // Try to delete image
    if(oldImg !== '' && oldImg !== null){
        try {
            fs.unlinkSync('./uploads/' + oldImg)
        } catch(err) {
            return res.status(400).json({ errors: err });
        }
    }

    await deleteAProductById( productId );

    return res.json({
        message: 'Product deleted'
    });
}



export async function updateProduct( req: Request, res: Response ){
    const categoryId = req.params.categoryId;
    const productId = req.params.productId;
    const updateItem: IProduct = req.body;

   // Save and store image
    if(req.files){
        const image: any = req.files.image;
        updateItem['image'] = image.name;

        // Validate the file type
        if(image.mimetype !== 'image/png'){
            return res.status(400).json({ errors: 'The file type is invalid' });
        }

        // Get the name of the previous image to delete it
        const oldImage: any = await findAProductByIdAndCategoryId( productId, categoryId );
        const oldImg: string = oldImage['image'];

        // Try to delete old image
        if(oldImg !== '' && oldImg !== null){
            try {
                fs.unlinkSync('./uploads/' + oldImg)
            } catch(err) {
                return res.status(400).json({ errors: err });
            }
        }

        // Store file
        image.mv('./uploads/' + image.name, function (error: any){
            if(error){
                return res.status(400).json({ errors: error });
            }
        });
    }

    await updateAProduct(productId, categoryId, updateItem);

    // Success Response
    return res.json({
        message: "Item Updated"
    });
}