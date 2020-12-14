import Order, { IOrder } from '../Entities/order.model';

export async function findUserOrder( userId: string ){
    
    const order = await Order.findOne({ user_id: userId, status: 'active' });

    return order;

}

export async function createAnOrder( userId: string ){
    
    const newOrder: IOrder = new Order({
        user_id: userId
    });

    const order = await newOrder.save();

    return order;

}

export async function findAllUserOrders( userId: string ){
    
    const orders = await Order.find({ user_id: userId });

    return orders;

}

export async function updateAOrder( order: IOrder, orderId: string, userId: string ){
    const orderUpdated = await Order.updateOne( { _id: orderId, user_id: userId }, { 
        status: order.status,
        payment_type: order.payment_type,
        proof_of_payment: order.proof_of_payment,
        delivery_method: order.delivery_method,
        commentary: order.commentary,
        calification: order.calification,
        full_address: order.full_address
     } );

    return orderUpdated;
}

export async function findActiveOrderByUserOrder( userId: string, orderId: string ){
    
    const order = await Order.findOne({ user_id: userId, _id: orderId,  status: 'active' });

    return order;

}

export async function findInHouseOrderByUserOrder( userId: string, orderId: string ){
    
    const order = await Order.findOne({ user_id: userId, _id: orderId,  status: 'in house' });

    return order;

}

export async function findOrderByUserOrder( userId: string, orderId: string ){
    
    const order = await Order.findOne({ user_id: userId, _id: orderId });

    return order;

}

export async function findAllOrderInProcess( ){
    
    const orders = await Order.find({ status: 'in process' });

    return orders;

}

export async function findAllOrderInKitchen( ){
    
    const orders = await Order.find({ status: 'in kitchen' });

    return orders;

}

export async function findAllOrderToDelivery( ){
    
    const orders = await Order.find({ status: 'to delivery' });

    return orders;

}


export async function findAllOrderInHouse( ){
    
    const orders = await Order.find({ status: 'in house' });

    return orders;

}

export async function findOrderById( orderId: string ){
    
    const order = await Order.findOne({ _id: orderId });

    return order;

}

export async function updateStatusAOrder( orderId: string, newStatus: string ){
    const orderUpdated = await Order.updateOne( 
        { _id: orderId }, 
        { $set: { status: newStatus } 
    } );

    return orderUpdated;
}

export async function updateCloseAOrder( 
    orderId: string, 
    userId: string, 
    newCalification: number, 
    newStatus: string ){

        const orderUpdated = await Order.findOne({ _id: orderId, user_id: userId });

        if( orderUpdated ){
            orderUpdated.status = newStatus;
            orderUpdated.calification = newCalification;

            await orderUpdated.save();
        }

    return orderUpdated;
}