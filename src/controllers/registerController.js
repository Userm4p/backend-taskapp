import Conect from '../database';
import { generatePass } from '../utils/crypt';

export const registerController = async (req, res) => {
    try{
        let user = req.body.user;
        user = {
            ...user,
            password: await generatePass(user.password)
        }
        console.log(user)
        const data = await Conect('users');
        const users = data.insertOne(user , (err, doc) => {
            if(err) return process.exit(1);
            res.json({
                status:true,
                massage:'usuario creado exitosamente'
            })
        });
    }catch(err){
        res.json({message:err}).status(400)
    }
    
}