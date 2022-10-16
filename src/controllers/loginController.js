import Conect from "../database";
import { verifyPassword } from '../utils/crypt';

export const loginController = async (req, res) => {
    try {
        let user = req.body.user;
        const data = await Conect('users');
        data.find({ username: user.username }).toArray(async (err, users) => {
            if (users.length>0){
                const validatepass = await verifyPassword(users[0].password, user.password);
                if(validatepass) {
                    res.json({ user:{
                        username:users[0].username,
                        status:true
                    } }).status(200);
                }else{
                    res.json({ message: 'el usuario o la contraseña no coinciden' })
                }
            }else{
                res.json({ message: 'el usuario ingresado no existe' })
            } 
        });
    } catch (err) {
        res.json({ message: err }).status(400)
    }
}
