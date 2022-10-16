import {MongoClient} from 'mongodb'
import { dbName, mongoUri } from '../config/config';

var connection = null;
const Conect = (collection) => new Promise(async (resolve, reject) => {
    try {
        if(!connection){
            const client = new MongoClient(mongoUri)
            connection = await client.connect();
            console.log('Conexión exitosa!!!');
        }
        console.log('Utilizando conexión');
        const db = connection.db(dbName);
        resolve(db.collection(collection));
    }catch(error){
        reject(error);
    }
})

export default Conect;