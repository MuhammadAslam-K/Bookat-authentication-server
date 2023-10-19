import Express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import user from './interface/router/userRouter';
import driver_router from './interface/router/driverRouter';
import admin_router from './interface/router/adminRouter';
import connect from './config/mongoDB';
import jwtTokenAuth from './middlewares/jwtTokenAuth';
import http from 'http'

import { setUpSocketIO } from './services/socket-io';

dotenv.config();

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const app = Express();
app.use(cors());
app.use(Express.json({ limit: '10mb' }));

const server = http.createServer(app);

const allowedOrigins = ["http://localhost:5173"];
app.use(
    cors({
        origin: function (origin: any, callback: any) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }
    )
)
// app.use(jwtTokenAuth.validateToken);

app.use('/', user);
app.use('/driver', driver_router);
app.use('/admin', admin_router);

setUpSocketIO(server)




if (MONGO_URL) {
    connect(MONGO_URL).then(() => {
        server.listen(port, () => console.log(`Server started at http://localhost:${port}`));
    }).catch((err) => {
        console.error('MongoDB connection error:', err);
    });
} else {
    console.log('Cannot access the URL from environment');
}
