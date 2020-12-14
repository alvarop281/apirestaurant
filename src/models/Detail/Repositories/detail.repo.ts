import Detail, {IDetail} from '../Entities/detail.model';

export async function findAllDetails( orderId: string ){
    
    const details = await Detail.find( { order_id: orderId });

    return details;

}

export async function findDetail( orderId: string, productId: string ){
    
    const detail = await Detail.findOne( { order_id: orderId, product_id: productId });

    return detail;

}

export async function findDetailById( detailId: string ){
    
    const detail = await Detail.findOne( { _id: detailId });

    return detail;

}

export async function createADetail( 
    orderId: string, 
    productId: string, 
    orderedQuantity: number,
    unitePrice: number,
    totalByProduct: number ){
    
    const newDetail: IDetail = new Detail({
        order_id: orderId,
        product_id: productId,
        ordered_quantity: orderedQuantity,
        unite_price: unitePrice,
        total_by_product: totalByProduct
    });
    
    const detail = await newDetail.save()

    return detail;

}

export async function deleteDetail( detailId: string ){
    
    const result = await Detail.findOneAndDelete( { _id: detailId } );

    return result;

}

export async function findDetailByIdAndOrderId( orderId: string, detailId: string ){
    
    const detail = await Detail.findOne( { _id: detailId, order_id: orderId });

    return detail;

}

export async function updateDetailToAdd( detailId: string, total: number ){

    await Detail.findByIdAndUpdate( 
        { _id: detailId }, 
        {   total_by_product: total,
            $inc : {'ordered_quantity' : 1 }
    } );

}

export async function updateDetailToSubtract( detailId: string, total: number ){

    await Detail.findByIdAndUpdate( 
        { _id: detailId }, 
        {   total_by_product: total,
            $inc : {'ordered_quantity' : -1 }
    } );

}