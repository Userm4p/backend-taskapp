
export const loginMiddleware = (req, res, next) => {
    const user = req.body.user;
    if(!user){
        res.json({message:'parámetros inválidos'}).status(400);
    }else if(!user.password || !user.username){
        res.json({message:'el usuario y la contraseña son requeridos'}).status(400);
    }else{
        next()
    }
}