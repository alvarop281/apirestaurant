import { Router } from 'express';
const router = Router();

import { getCategories } from '../../controllers/categories.controllers';
import { getProducts } from '../../controllers/products.controller';

router.route('/categories')
    .get( getCategories );


router.route('/categories/:categoryId/products')
    .get( getProducts );


export default router;