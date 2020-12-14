import { Router } from 'express';
const router = Router();

// Validator
import { body } from 'express-validator';

// Middleware
import { verifyToken } from '../../middleware/verifyToken'
import { validateReq } from '../../middleware/validateReq';
import { userValidate } from '../../middleware/userValidate';
import { orderActiveValidate } from '../../middleware/orderValidate';
import { detailsOrderMatchValidate } from '../../middleware/detailValidate';

// Controllers
import { 
    createOrder, 
    getOrders, 
    updateOrder } from '../../controllers/order.controller';
import { 
    getDetails,
    createDetail, 
    deleteADetail, 
    UpdateADetail } from '../../controllers/detail.controller';

router.route('/orders')
    .get(verifyToken, userValidate, getOrders)
    .post([
        body('status').optional().not().exists().withMessage('Invalid request'),
        body('payment_type').optional().not().exists().withMessage('Invalid request'),
        body('proof_of_payment').optional().not().exists().withMessage('Invalid request'),
        body('delivery_method').optional().not().exists().withMessage('Invalid request'),
        body('commentary').optional().not().exists().withMessage('Invalid request'),
        body('calification').optional().not().exists().withMessage('Invalid request'),
        body('full_address').optional().not().exists().withMessage('Invalid request'),
        body('user_id').optional().not().exists().withMessage('Invalid request')
    ], verifyToken, userValidate, validateReq, createOrder);

router.route('/orders/:orderId')
    .put([
        body('status').optional().not().exists().withMessage('Invalid request'),
        body('user_id').optional().not().exists().withMessage('Invalid request'),
        body('commentary').optional().isLength({ min: 1 }).withMessage('You must indicate a commentary'),
        body('delivery_method').optional().isIn(['delivery', 'pickUp']).withMessage('You must indicate a delivery method'),
        body('payment_type').optional().isIn(['cash', 'transfer', 'card']).withMessage('You must indicate a payment type'),
        body('calification').optional().isInt({ min: 0, max: 5 }).withMessage('You must indicate a valid calification')
    ], verifyToken, userValidate, validateReq, orderActiveValidate, updateOrder)

router.route('/orders/:orderId/details')
    .get(verifyToken, userValidate, getDetails)

    .post([
        body('unite_price').optional().not().exists().withMessage('Invalid request'),
        body('total_by_product').optional().not().exists().withMessage('Invalid request'),
        body('order_id').optional().not().exists().withMessage('Invalid request'),
        body('product_id').isLength({ min: 1 }).withMessage('You must indicate a commentary'),      
        body('ordered_quantity').isInt({ min: 1 }).withMessage('You must indicate a valid quantity')
    ], verifyToken, userValidate, validateReq, orderActiveValidate, createDetail );



router.route('/orders/:orderId/details/:detailId')
    .delete(
        verifyToken, 
        userValidate, 
        validateReq, 
        orderActiveValidate, 
        detailsOrderMatchValidate, 
        deleteADetail)

    .put([
        body('unite_price').optional().not().exists().withMessage('Invalid request'),
        body('total_by_product').optional().not().exists().withMessage('Invalid request'),
        body('order_id').optional().not().exists().withMessage('Invalid request'),
        body('product_id').optional().not().exists().withMessage('Invalid request'),     
        body('ordered_quantity').optional().not().exists().withMessage('Invalid request'),
        body('operator').optional().isIn(['add', 'subtract']).withMessage('You must indicate a valid operator'),
    ], verifyToken, userValidate, validateReq, orderActiveValidate, detailsOrderMatchValidate, UpdateADetail);

export default router;