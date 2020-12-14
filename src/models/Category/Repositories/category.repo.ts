import Category, { ICategory } from '../Entities/category.model';

export async function findAllCategories( ){
    
    const categories = await Category.find( );

    return categories;

}

export async function createUser( description: string ){
    const category: ICategory = new Category({
        description: description
    });

    const saveCategory = await category.save();

    return saveCategory;
}

export async function updateACategory( id: string, newDescription: string ){
    
    const category = await Category.findOne( { _id: id } );
    
    if( category ) {
        category.description = newDescription;
        await category.save();
    }

    return category;

}

export async function findACategoryById( id: string ){
    
    const category = await Category.findOne( { _id: id } );

    return category;

}

export async function deleteCategoryById( id: string ){
    
    const category = await Category.findByIdAndDelete( { _id: id } );

    return category;

}