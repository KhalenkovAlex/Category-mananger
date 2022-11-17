import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './db';
import models from './models/models';
import router from './routes/index';

dotenv.config();
const app: Express = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api', router);

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => { console.log(`[server]: Server is running on port: ${ PORT }`)});
    } catch (e) {
        throw e;
    }
})();
