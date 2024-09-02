import {Request, Response} from 'express'
import {commentsServices} from "../services/commentsServices";


export const delCommentController = async (req: Request<{id: string}>, res: Response) => {
    const deleteResult = await commentsServices.deleteUser(req.params.id)
    if(!deleteResult) return res.sendStatus(404)
    return  res.sendStatus(204)
}