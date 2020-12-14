import Product, { IProduct } from '../Entities/product.model';

export async function findAllProducts( id: string ){
    
    const products = await Product.find({ category_id: id });

    return products;

}

export async function findAProduct( id: string ){
    
    const product = await Product.findOne({ _id: id });

    return product;

}

export async function createAProduct( newProduct: IProduct ){
    
    const product: IProduct = new Product({
        name: newProduct.name,
        image: newProduct.image,
        price: newProduct.price,
        category_id: newProduct.category_id
    });

    const saveProduct = await product.save();

    return saveProduct;

}

export async function findAProductByName( name: string ){
    
    const product = await Product.findOne({ name: name });

    return product;

}

export async function findAProductByIdAndCategoryId( id: string, categoryId: string ){
    
    const product = await Product.findOne({ _id: id, category_id: categoryId });

    return product;

}

export async function deleteAProductById( id: string ){
    
    const product = await Product.findByIdAndDelete({ _id: id });

    return product;

}

export async function updateAProduct( id: string, categoryId: string, newProduct: IProduct ){
    
    const product = await Product.findOne({ _id: id, category_id: categoryId });

    if( product ) {
        if( newProduct.name ){
            product.name = newProduct.name;
        }
        if( newProduct.price ){
            product.price = newProduct.price; 
        }
        if( newProduct.status ){
            product.status = newProduct.status; 
        }
        if( newProduct.image ){
            product.image = newProduct.image;
        }

        await product.save();
    }

    return product;

}