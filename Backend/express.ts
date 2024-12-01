import express, {Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import connectDB from './db';
import * as routers from './src/routes/index';


const app = express();

connectDB().catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(compression());
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://pawcity-f27df.firebaseapp.com', 
        'https://pawcity-f27df.web.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use('/uploads', express.static('uploads'));

// enables trust proxy for X-forwarded header
app.enable('trust proxy');

app.get('/', (req: Request, res: Response) => {
    res.send('Node Server is live!!');
})

app.use('/', [routers.userRouter, routers.authRouter, routers.photosRouter, routers.matchRouter]);

export default app;
