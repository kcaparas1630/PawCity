import express, {Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import connectDB from './db';
import * as routers from './src/routes/index';


const app = express();

connectDB().catch(console.error);

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limit each ip to 10 requests per window/minute
});


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(compression());
app.use(cors());
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
    res.send('Node Server is live!!');
})

app.use('/', [routers.userRouter, routers.authRouter]);

export default app;
