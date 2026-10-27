
// imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// routes
import { router } from './routes.js';

// env
dotenv.config({});

// express - init
const app = express();

// cors
app.use(cors({
   origin: '*'
}));

// routes - init
app.use(router);

app.listen(process.env.SERVER_PORT, () => {
   console.log('✔️ Server running: ', process.env.SERVER_PORT);
});