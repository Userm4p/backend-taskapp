import Conect from "../database";

export const registerMiddleware = async (req, res, next) => {
    const user = req.body.user;
    if(!user){
        res.json({message:'parámetros inválidos'}).status(400);
    }else if(!user.email || !user.password || !user.username){
        res.json({message:'el usuario, la contraseña y el correo electrónico son obligatorios'}).status(400);
    }else{
        try{
            const data = await Conect('users');
            data.find({username:user.username}).toArray((err, users) => {
                if(err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                if(users.length>0){
                    res.json({message:'el usuario ingresado ya existe'}).status(400);
                }else{
                    next()
                }
            });
        }catch {
            res.json({message:'error interno del servidor'}).status(500);
        }
    }
}