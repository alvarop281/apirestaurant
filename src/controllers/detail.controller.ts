import { Request, Response } from 'express'

// Model
import { 
    findAllDetails,
    findDetail,
    createADetail,
    deleteDetail,
    updateDetailToAdd,
    updateDetailToSubtract,
    findDetailById } from '../models/Detail/Repositories/detail.repo';
import { findOrderByUserOrder } from '../models/Order/Ropositories/order.repo';
import { findAProduct } from '../models/Product/Repositories/product.repo';


export async function getDetails( req: Request, res: Response ){
    const orderId = req.params.orderId;
    const userId = req.userId;

    const order = await findOrderByUserOrder(userId, orderId);
    if( !order ) return res.status(404).json({ errors: "Order not found!" })

    // Models
    const details = await findAllDetails(orderId);

    return res.json(details);
}

export async function createDetail( req: Request, res: Response ){
    const orderId: string = req.params.orderId;
    const productId: string = req.body.product_id;
    const orderedQuantity: number = req.body.ordered_quantity;

    // check detail
    const checkDetail = await findDetail(orderId, productId);
    if( checkDetail ) return res.status(400).json({ errors: "Detail already exists!" });

    // check product
    const product = await findAProduct(productId);
    if( !product ) return res.status(404).json({ errors: "Product does not exist!" });

    const unitePrice = product?.price;
    const totalByProduct = unitePrice * orderedQuantity;

    const detail = await createADetail(orderId, productId, orderedQuantity, unitePrice, totalByProduct);

    return res.json(detail);

}

export async function deleteADetail( req: Request, res: Response ){

    const detailId = req.params.detailId;

    const detail = await deleteDetail(detailId);

    return res.json( { 
        message: 'Detail deleted',
        detail
        } );
}

export async function UpdateADetail( req: Request, res: Response ){

    const operator = req.body.operator;
    const detailId = req.params.detailId;

    const oldDetail = await findDetailById(detailId);

    if( oldDetail && operator === 'add' ) {
        const quantity: number = oldDetail.ordered_quantity + 1;
        const price: number = oldDetail.unite_price;
        const total: number = price * quantity; 
    
        await updateDetailToAdd(detailId, total);

        return res.json( { message: 'Detail updated' } );
    }

    if( oldDetail && operator === 'subtract' ) {
        const quantity: number = oldDetail.ordered_quantity - 1;
        const price: number = oldDetail.unite_price;
        const total: number = price * quantity; 
    
        await updateDetailToSubtract(detailId, total);

        return res.json( { message: 'Detail updated' } );
    }


    return res.status(400).json( { message: 'Could not update' } );
}