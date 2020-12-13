import { Router } from 'express';
const router = Router();

// Middleware to validate
import { body } from 'express-validator';
import { validateReq } from '../../middleware/validateReq';
import { verifyToken } from '../../middleware/verifyToken';

// Controller
import { sigin, profile, login } from '../../controllers/auth.controlle';

router.route('/sigin/')
    .post([
        body('email').isEmail().withMessage('You must indicate a real email'),
        body('password').isLength({ min: 6 }).withMessage('You must enter a password with at least 6 digits'),
        body('dni').isLength({ min: 3 }).withMessage('You must indicate a real dni')
    ], validateReq, sigin);

router.route('/profile/')
    .get(verifyToken, profile);

router.route('/login/')
    .post([
        body('email').isEmail().withMessage('You must indicate a real email'),
        body('password').isLength({ min: 6 }).withMessage('You must enter a password with at least 6 digits')
    ], validateReq, login);


export default router;