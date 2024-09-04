import {Response, Request} from 'express'
import {LoginInputModel} from "../types/input/login-input.model";
import {authServices} from "../services/authServices";
import {MeOutputModel} from "../types/output/me-output.model";


export const getMeController = async (req: Request, res: Response<MeOutputModel>) => {
    //TODO:release it
    const {email,login} = req.user!
    const userViewObject = {
        ...{email,login},
        userId:req.user!._id.toString()
    }

    res.status(200).send(userViewObject)
}