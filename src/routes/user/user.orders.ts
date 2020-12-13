import { Router } from 'express';
const router = Router();

// Validator
import { body } from 'express-validator';

// Middleware
import { verifyToken } from '../../middleware/verifyToken'
import { validateReq } from '../../middleware/validateReq';
import { userValidate } from '../../middleware/userValidate';

// Controllers
import { createOrder, getOrders, updateOrder } from '../../controllers/order.controller';

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
    ], verifyToken, userValidate, validateReq, updateOrder)

export default router;