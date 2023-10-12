import Express, { Request, Response } from 'express';
import * as dotenv from "dotenv"
import cors from 'cors'

import user from "./interface/router/userRouter";
import driver_router from './interface/router/driverRouter';
import admin_router from './interface/router/adminRouter';
import connect from './config/mongoDB';
import jwtTokenAuth from './middlewares/jwtTokenAuth';

dotenv.config()

const port = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const app = Express()
app.use(cors())
app.use(Express.json({ limit: '10mb' }));

const allowedOrigins = [process.env.FRONT_END];
app.use(
    cors({
        origin: function (origin: any, callback: any) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
    })
);
app.use(jwtTokenAuth.validateToken)

app.use("/", user)
app.use("/driver", driver_router)
app.use("/admin", admin_router)


MONGO_URL ? connect(MONGO_URL).then(() => {

    app.listen(port, () => console.log(`server started at http://localhost:${port}`))
}) : console.log("Cannot access the url from env");
