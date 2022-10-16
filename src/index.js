import express from 'express';
import cors from 'cors'
import {port} from './config/config'
import userRoutes from './routes/usersRoutes'
import notesRoutes from './routes/notesRoutes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



app.use("/users", userRoutes)
app.use("/notes", notesRoutes)

console.log(
	"***************************************************\n" +
	"**               Task APP Services               **\n" +
	"***************************************************"
);

const PORT = port || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

export default app;

