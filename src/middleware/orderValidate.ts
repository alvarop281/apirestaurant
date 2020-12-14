import { Request, Response, NextFunction } from 'express';

// Models
import { 
    findActiveOrderByUserOrder,
    findInHouseOrderByUserOrder } from '../models/Order/Ropositories/order.repo';

export async function orderActiveValidate(req:Request, res:Response, next:NextFunction){
    
    const userId = req.userId;
    const orderId = req.params.orderId;

    const oldOrder = await findActiveOrderByUserOrder(userId, orderId);
    if( !oldOrder ) return res.status(404).json({ errors: "Order not found!" })

    next();
}

export async function orderInHouseValidate(req:Request, res:Response, next:NextFunction){
    
    const userId = req.userId;
    const orderId = req.params.orderId;

    const oldOrder = await findInHouseOrderByUserOrder(userId, orderId);
    if( !oldOrder ) return res.status(404).json({ errors: "Order not found!" })

    next();
}