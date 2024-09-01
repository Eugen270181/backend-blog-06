import {Router} from 'express'
import {loginAuthController} from "./controllers/loginAuthController";
import {loginAuthValidators} from "./middlewares/loginAuthValidators";
export const authRouter = Router()

//testingRouter.use(adminMiddleware)
authRouter.post('/login', loginAuthValidators, loginAuthController)