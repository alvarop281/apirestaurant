import { Request, Response, NextFunction } from 'express';

// Models
import { findDetailByIdAndOrderId } from '../models/Detail/Repositories/detail.repo';

export async function detailsOrderMatchValidate(req:Request, res:Response, next:NextFunction){
    
    const orderId = req.params.orderId;
    const detailId = req.params.detailId;

    const checkDetail = await findDetailByIdAndOrderId(orderId, detailId);
    if( !checkDetail ) return res.status(404).json({ errors: "Detail and order don't match!" });

    next();
}