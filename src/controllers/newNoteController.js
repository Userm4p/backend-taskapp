import Conect from '../database';

export const newNoteController = async (req, res) => {
    try{
        const noteReq = req.body;
        const {user, note} = noteReq
       
        const jsDate = new Date();
        const date = jsDate.getDate()+'-'+(jsDate.getMonth()+1)+'-'+jsDate.getFullYear() 
        const data = await Conect('notes');
        data.find({ username: user }).toArray(async (err, notes) => {
            if(notes.length>0){
                let notesOfToday = [];
                const test = notes[0].notes.find((item)=> {return item.notes_date===date});
                
                if(test){
                    notesOfToday = test.notes;
                }

                const noteWithId = {
                    ...note,
                    id:notesOfToday.length,
                };

                notesOfToday.unshift(noteWithId);

                const notesToAdd = notes[0].notes.map((item)=>{
                    if(item.notes_date === date){
                        return {notes_date:date  ,notes:notesOfToday};
                    }else{
                        return item;
                    }
                });

                
                if(!test){
                    notesToAdd.unshift({notes_date:date  ,notes:notesOfToday});
                }

                let newTemplate = {
                    ...notes[0],
                     notes:notesToAdd
                }
                delete newTemplate._id;
                
                data.findOneAndUpdate({ username: user }, {
                    $set: newTemplate
                },
                    function(error, info) {
                        if (error) {
                            res.json({
                                resultado: false,
                                msg: 'No se pudo modificar el cliente',
                                err
                            });
                        } else {
                            res.json({newTemplate})
                        }
                    }
                )
            }else {
                const noteWithId = {
                    ...note,
                    id:0
                };
                const newUserNotes = {
                    username:user,
                    notes:[{
                        notes_date: date,
                        notes: [{
                            ...noteWithId
                        }]
                    }]
                }
                data.insertOne({...newUserNotes} , (err, doc) => {
                    if(err) return process.exit(1);
                    res.json({
                        status:true,
                        massage:'Nota creada'
                    })
                });
            }
        });
        
    }catch(err){
        res.json({message:err}).status(400)
    }
    
}