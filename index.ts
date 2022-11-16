import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './db';
import models from './models/model';
import router from './routes/index';

dotenv.config();
const app: Express = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = (async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => { console.log(`[server]: Server is running at port:${ PORT }`)});
    } catch (e) {
        throw e;
    }
})();
