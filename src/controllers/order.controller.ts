import { Request, Response } from 'express'

// Interface
import { IOrder } from '../models/Order/Entities/order.model';

// Model
import { 
    findUserOrder, 
    createAnOrder, 
    findAllUserOrders,
    updateAOrder,
    findAllOrderInProcess,
    findAllOrderInKitchen,
    findAllOrderToDelivery,
    findAllOrderInHouse,
    findOrderById,
    updateStatusAOrder
        } from '../models/Order/Ropositories/order.repo';

export async function createOrder( req: Request, res: Response ){
    
    const userId = req.userId;

    const order = await findUserOrder( userId )

    if( !order ) {
        const order = await createAnOrder( userId );
        return res.status(201).json({ order });
    } else {
        return res.json({ order });
    }

}

export async function getOrders( req: Request, res: Response ) {

    const userId = req.userId;

    const orders = await findAllUserOrders(userId);

    return res.json({ orders });

}

export async function updateOrder( req: Request, res: Response ){
    // Save request data
    const userId = req.userId;
    const orderId = req.params.orderId;
    const updateOrder: IOrder = req.body;

    // Save and store image
    if(req.files){
        const image: any = req.files.proof_of_payment;

        updateOrder['proof_of_payment'] = userId + '-' + orderId + '-' + image.name;

        // Validate the file type
        if(image.mimetype !== 'image/png' && image.mimetype !== 'image/jpg'){
            return res.status(400).json({ errors: 'The file type is invalid' });
        }

        // Store file
        image.mv('./uploads/proof/' + userId + '-' + orderId + '-' + image.name, function (error: any){
            if(error){
                return res.status(400).json({ error });
            }
        });
        updateOrder['status'] = 'in process';
    }

    const order = await updateAOrder( updateOrder, orderId, userId );

    return res.json( {
        message: 'Order Updated'
    } );
}

export async function getOrdersInProcess( req: Request, res: Response ) {

    const orders = await findAllOrderInProcess();

    return res.json({ orders });

}

export async function getOrdersInkitchen( req: Request, res: Response ) {

    const orders = await findAllOrderInKitchen();

    return res.json({ orders });

}

export async function getOrdersToDelivery( req: Request, res: Response ) {

    const orders = await findAllOrderToDelivery();

    return res.json({ orders });

}

export async function getOrdersInHouse( req: Request, res: Response ) {

    const orders = await findAllOrderInHouse();

    return res.json({ orders });

}


export async function updateStatusOrder( req: Request, res: Response ){
    // Save request data

    const orderId = req.params.orderId;

    const updateOrder = await findOrderById(orderId);
    if( !updateOrder ) return res.status(404).json({ errors: "Order not found" });

    if ( updateOrder ){
        let status: string = updateOrder.status;

        if(status === 'active' || status === 'in house'){
            return res.status(404).json({ errors: "The order is not ready" });
        }

        switch(status){
            case 'to delivery':
                status = 'in house';
                break;
            case 'in kitchen':
                status = 'to delivery';
                break;
            case 'in process':
                status = 'in kitchen';
                break;
        }
        await updateStatusAOrder(orderId, status);
    }


    return res.json( {
        message: 'Order Updated'
    } );
}