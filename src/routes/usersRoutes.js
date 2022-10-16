import express from 'express';
import { loginController } from '../controllers/loginController';
import { registerController } from '../controllers/registerController';
import { loginMiddleware } from '../middlewares/login.middleware';
import { registerMiddleware } from '../middlewares/register.middleware';

const app = express();

app.post(
	"/new",
	function (req, res, next) {
		registerMiddleware(req, res, next)
	}
	, registerController
)
app.post(
	"/login",
	function (req, res, next) {
		loginMiddleware(req, res, next)
	}
	, loginController
)

export default app;