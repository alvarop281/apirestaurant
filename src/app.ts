import express, { Application, response } from 'express'; 
var morgan = require('morgan')
import upload from 'express-fileupload';

// Routes
import AuthRoute from './routes/auth/auth';
import PublicRoute from './routes/public/public.categories';
import UserRouter from './routes/user/user.orders';
import AdminRouter from './routes/admin/admin';

export class App{
    private app: Application;

    constructor( private port?: number | string ){
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    // Settings
    settings(){
        this.app.set( 'port', this.port || process.env.PORT || 3000 );
    }

    // Middleware
    middleware(){
        this.app.use(morgan('dev'));
        this.app.use( express.json() );      // Allows to receive form data in json format
        this.app.use( upload({
            createParentPath: true,
            limits: {
                fileSize: 2 * 1024 * 1024 * 1024        //2MB max
            }
        }) );            //Upload file
    }

    // Routes
    routes(){
        
        // Auth
        this.app.use('/auth', AuthRoute);
        // post   http://localhost:3000/auth/sigin/
        // post   http://localhost:3000/auth/login/
        // get    http://localhost:3000/auth/profile/

        // Public
        this.app.use('/public', PublicRoute);
        // get    http://localhost:3000/public/categories/
        // get    http://localhost:3000/public/categories/:categoryId/products/

        // User
        this.app.use('/user', UserRouter);
        // post   http://localhost:3000/user/orders/
        // get    http://localhost:3000/user/orders/
        // put    http://localhost:3000/user/orders/:orderId
        // put    http://localhost:3000/user/close/orders/:orderId

        // get    http://localhost:3000/user/orders/:orderId/details
        // post   http://localhost:3000/user/orders/:orderId/details

        // delete http://localhost:3000/user/orders/:orderId/details:detailId
        // put    http://localhost:3000/user/orders/:orderId/details:detailId

        // Admin
        this.app.use('/admin', AdminRouter);
        // get    http://localhost:3000/public/categories/
        // post   http://localhost:3000/public/categories/
        // put    http://localhost:3000/public/categories/:categoryId
        // delete http://localhost:3000/public/categories/:categoryId

        // get    http://localhost:3000/public/categories/:categoryId/products/


        // get    http://localhost:3000/admin/orders/inprocess
        // get    http://localhost:3000/admin/orders/inkitchen
        // get    http://localhost:3000/admin/orders/todelivery
        // get    http://localhost:3000/admin/orders/inhouse

        // put    http://localhost:3000/admin/orders/:orderId

    }


    // Listening
    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on Port', this.app.get('port'));
    }
}