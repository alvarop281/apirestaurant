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

export async function findOrderByUserIdAndOrderId( userId: string, orderId: string ){
    
    const order = await Order.findOne({ user_id: userId, _id: orderId,  status: 'active' });

    return order;

}