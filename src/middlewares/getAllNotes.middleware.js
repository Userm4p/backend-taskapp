
export const getAllNotesMiddleware = (req, res, next) => {
    const user = req.query.user;
    if(!user){
        res.json({message:'parámetros inválidos'}).status(400);
    }else{
        next()
    }
}