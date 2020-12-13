import express, { Application, response } from 'express'; 
var morgan = require('morgan')
import upload from 'express-fileupload';

// Routes
import AuthRoute from './routes/auth/auth';
import PublicRoute from './routes/public/public.categories';
import UserRouter from './routes/user/user.orders';

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

        this.app.use('/user', UserRouter)
        // post   http://localhost:3000/user/orders/

    }


    // Listening
    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on Port', this.app.get('port'));
    }
}