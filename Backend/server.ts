import dotenv from 'dotenv';
import app from './express';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`);
});
