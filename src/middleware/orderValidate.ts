import { Request, Response, NextFunction } from 'express';

// Models
import { findActiveOrderByUserOrder } from '../models/Order/Ropositories/order.repo';

export async function orderActiveValidate(req:Request, res:Response, next:NextFunction){
    
    const userId = req.userId;
    const orderId = req.params.orderId;

    const oldOrder = await findActiveOrderByUserOrder(userId, orderId);
    if( !oldOrder ) return res.status(404).json({ errors: "Order not found!" })

    next();
}