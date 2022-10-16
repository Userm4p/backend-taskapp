import {config} from 'dotenv';

config();

console.log(process.env.PORT);

const port = process.env.PORT;
const mongoUri = process.env.MONGOURI;
const dbName = process.env.DBNAME;
export {
    port,
    mongoUri,
    dbName
}