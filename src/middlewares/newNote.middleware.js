export const newNoteMiddleware = async (req, res, next) => {
    const note = req.body.note;
    const user = req.body.user;
    if (!note || !user) {
        res.json({ message: 'parámetros inválidos' }).status(400);
    } else if (!note.title || !note.description || !note.points || (!note.status && note.status !== 0 )) {
        res.json({ message: 'las notas requieren un titulo, descripción, estado y puntos' }).status(400);
    } else if (note.points.length === 0) {
        res.json({ message: 'las notas deben contener incisos' }).status(400);
    } else if (note.points.length > 0) {
        for (const point of note.points) {
            if (!(point.id || point.id===0) || !point.status || !point.paragraphs) {
                console.log(point)
                res.json({ message: "los puntos deben tener un id, un estado y un texto" });
                break;
            }else if(point === note.points[note.points.length-1]){
                next();
            }
        }
    }
}
