import { Router } from 'express';
const router = Router();

// Middleware
import { body } from 'express-validator';
import { verifyToken } from '../../middleware/verifyToken'
import { validateReq } from '../../middleware/validateReq';
import { userValidate } from '../../middleware/userValidate';

// Controller
import { updateUser } from '../../controllers/user.controller';

router.route('/user')
    .put([
        body('email').optional().not().exists().withMessage('Invalid request'),
        body('_id').optional().not().exists().withMessage('Invalid request'),
        body('type_of_user').optional().not().exists().withMessage('Invalid request'),
        body('password').optional().isLength({ min: 6 }).withMessage('You must enter a password with at least 6 digits'),
        body('dni').optional().isLength({ min: 3 }).withMessage('You must indicate a real dni'),
        body('full_name').optional().isLength({ min: 3 }).withMessage('You must indicate you real name'),
        body('phone_number').optional().isLength({ min: 3 }).withMessage('You must indicate you real phone')
    ], verifyToken, userValidate, validateReq, updateUser);

export default router;