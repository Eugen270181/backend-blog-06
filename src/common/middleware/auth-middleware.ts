import {Response, Request, NextFunction} from 'express'

import {SETTINGS} from '../../settings'
import {jwtServices} from "../module/jwtServices";
import {usersServices} from "../../features/users/services/usersServices";
import {usersRepository} from "../../features/users/repositories/usersRepository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    //debugger;
    if(!req.headers.authorization){
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtServices.getUserIdByToken(token)
    if (userId) {
        req.user = await usersRepository.findUserById(userId)
        next()
    }

    res.send(401)
}