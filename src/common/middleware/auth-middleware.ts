import {Response, Request, NextFunction} from 'express'

import {jwtServices} from "../module/jwtServices";
import {usersRepository} from "../../features/users/repositories/usersRepository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    //debugger;
    if(!req.headers.authorization){
        res.sendStatus(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtServices.getUserIdByToken(token)
    if (userId) {
        const User = await usersRepository.getUserById(userId)
        if (!User) {
            res.sendStatus(401)
            return
        }
        req.user = {userId: User!._id.toString()}
        next()
    }

    res.sendStatus(401)
    return
}