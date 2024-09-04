import {Request, Response} from 'express'
import {commentsServices} from "../services/commentsServices";


export const delCommentController = async (req: Request<{id: string}>, res: Response) => {
    //TODO: RELEASE OBJECT RESULT WITH RETURN AND SEND REQ.USER
    const deleteResult = await commentsServices.deleteComment(req.params.id)
    if(!deleteResult) return res.sendStatus(404)
    return  res.sendStatus(204)
}