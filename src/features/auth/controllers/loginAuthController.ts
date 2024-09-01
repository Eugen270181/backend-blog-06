import {Response, Request} from 'express'
import {LoginInputModel} from "../types/input/login-input.model";
import {authServices} from "../services/authServices";


export const loginAuthController = async (req: Request<any, any, LoginInputModel>, res: Response) => {
    const isLogin = await authServices.isLogin(req.body)

    if (!isLogin) {
        res.sendStatus(401)
        return
    }
    res.sendStatus(204)
}