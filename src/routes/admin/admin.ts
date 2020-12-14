import { Router } from 'express';
const router = Router();

// Middlewares
import { body } from 'express-validator';
import { verifyToken } from '../../middleware/verifyToken';
import { adminValidate } from '../../middleware/adminValidate';
import { validateReq } from '../../middleware/validateReq';

// Controllers
import { getCategories } from '../../controllers/categories.controllers';
import { getProducts } from '../../controllers/products.controller';
import { 
    getOrdersInProcess, 
    getOrdersInkitchen, 
    getOrdersToDelivery, 
    getOrdersInHouse,
    updateStatusOrder } from '../../controllers/order.controller';



router.route('/categories')
    .get( verifyToken, adminValidate, getCategories );


router.route('/categories/:categoryId/products')
    .get( verifyToken, adminValidate, getProducts );


router.route('/orders/inprocess')
    .get( verifyToken, adminValidate, getOrdersInProcess );

router.route('/orders/inkitchen')
    .get( verifyToken, adminValidate, getOrdersInkitchen );

router.route('/orders/todelivery')
    .get( verifyToken, adminValidate, getOrdersToDelivery );

router.route('/orders/inhouse')
    .get( verifyToken, adminValidate, getOrdersInHouse );

router.route('/orders/:orderId')
    .put([
        body('status').optional().not().exists().withMessage('Invalid request'),
        body('payment_type').optional().not().exists().withMessage('Invalid request'),
        body('proof_of_payment').optional().not().exists().withMessage('Invalid request'),
        body('delivery_method').optional().not().exists().withMessage('Invalid request'),
        body('commentary').optional().not().exists().withMessage('Invalid request'),
        body('calification').optional().not().exists().withMessage('Invalid request'),
        body('full_address').optional().not().exists().withMessage('Invalid request'),
        body('user_id').optional().not().exists().withMessage('Invalid request')
    ], verifyToken, adminValidate, validateReq, updateStatusOrder);

export default router;