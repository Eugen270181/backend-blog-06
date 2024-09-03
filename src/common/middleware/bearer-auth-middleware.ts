import {Response, Request, NextFunction} from 'express'
import {SETTINGS} from '../../settings'

export const bearerAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
//TODO:release bearer auth

    next()
}