import express, { Application, response } from 'express'; 
var morgan = require('morgan')

// Routes
import AuthRoute from './routes/auth/auth';
import PublicRoute from './routes/public/public.categories';


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


    }


    // Listening
    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on Port', this.app.get('port'));
    }
}