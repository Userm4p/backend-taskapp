import Conect from "../database";

export const getAllController = async (req, res) => {
    try {
        const user = req.query.user;
        const data = await Conect('notes');
        data.find({ username: user }).toArray(async (err, users) => {
            res.json({ user:users
            }).status(200);
        });
    } catch (err) {
        res.json({ message: err }).status(400)
    }
}
