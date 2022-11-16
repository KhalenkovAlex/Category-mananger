import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const sequelize = require('./db');

const PORT = process.env.PORT;


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// app.post('/', (req: Request, res: Response) => {
//     const query = "SELECT * FROM test.test";
//     db.query(query, (error: any, data: any) => {
//         try {
//             console.log('########### data:', data);
//         } catch (e) {
//             throw error;
//         }
//     })
//     return res.send('Express + TypeScript Server!');
// });




const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => { console.log(`[server]: Server is running at port:${ PORT }`)});
    } catch (e) {
        throw e;
    }
};

start();
