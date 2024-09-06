import {Response, Request} from 'express'
import {LoginInputModel} from "../types/input/login-input.model";
import {authServices} from "../services/authServices";
import {MeOutputModel} from "../types/output/me-output.model";
import {usersQueryRepository} from "../../users/repositories/usersQueryRepository";


export const getMeController = async (req: Request, res: Response<MeOutputModel>) => {
    //TODO:release it
    const userId = req.user.userId!
    const meViewObject = await usersQueryRepository.getMapMe(userId)

    res.status(200).send(meViewObject!)
}