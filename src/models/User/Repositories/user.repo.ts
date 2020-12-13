require('../../../db');

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