import User, { IUser } from '../Entities/user.model';

export async function createUser( newUser: IUser ){
    const user: IUser = new User({
        email: newUser.email,
        password: newUser.password,
        dni: newUser.dni
    });

    const saveUser = await user.save();

    return saveUser;
}


export async function findUserById( id: string ){
    
    const user = await User.findById( id, { password: 0 } );

    return user;

}

export async function findUserByEmail( email: string ){
    
    const user = await User.findOne( {email: email} );

    return user;

}

export async function findUserByDni( dni: string ){
    
    const user = await User.findOne( {dni: dni} );

    return user;

}

export async function updateAUser( userId: string, updateUser: IUser ){
    
    const user = await User.findById( userId );

    if(user){
        if( updateUser.password ) {
            user.password = updateUser.password;
        }
        if( updateUser.dni ) {
            user.dni = updateUser.dni;
        }
        if( updateUser.full_name ) {
            user.full_name = updateUser.full_name;
        }
        if( updateUser.phone_number ) {
            user.phone_number = updateUser.phone_number;
        }

        await user.save();
    }
    
    return user;

}