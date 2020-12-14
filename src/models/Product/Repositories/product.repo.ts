import Product from '../Entities/product.model';


export async function findAllProducts( id: string ){
    
    const products = await Product.find({ category_id: id });

    return products;

}

export async function findAProduct( id: string ){
    
    const product = await Product.findOne({ _id: id });

    return product;

}