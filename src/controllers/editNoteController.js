import Conect from '../database';

export const editNoteController = async (req, res) => {
    try{
        const noteReq = req.body;
        const {user, note} = noteReq
        const data = await Conect('notes');
        data.find({ username: user }).toArray(async (err, notes) => {
            const notesByDate = notes[0].notes.find((item)=> {return item.notes_date===date});
            if(!notesByDate){res.json({message:'La fecha ingresada no corresponde con ninguna nota'})}
        });
        
    }catch(err){
        res.json({message:err}).status(400)
    }
    
}