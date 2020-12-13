import Category from '../Entities/category.model';

export async function findAllCategories( ){
    
    const categories = await Category.find( );

    return categories;

}