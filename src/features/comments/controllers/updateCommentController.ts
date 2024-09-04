import {Response, Request} from 'express'
import {commentsServices} from "../services/commentsServices";
import {commentsQueryRepository} from "../repositories/commentsQueryRepository";
import {OutputErrorsType} from "../../../common/types/output-errors-type";
import {CreateCommentInputModel} from "../types/input/create-comment-input.model";
import {CommentOutputModel} from "../types/output/comment-output.type";


export const updateCommentController = async (req: Request<any, any, CreateCommentInputModel>, res: Response<CommentOutputModel|OutputErrorsType>) => {
    //TODO: RELEASE OBJECT RESULT WITH RETURN AND SEND REQ.USER
    const updateCommentResult = await commentsServices.updateComment(req.body)
    if (!updateCommentResult.statusCode) {
        res.status(400).send({ errorsMessages: [ {message:'Not unique field!', field:updateCommentResult.data} ] })
        return
    }

    const updateComment = await commentsQueryRepository.findCommentAndMap(updateCommentResult.data)

    if (!updateComment) {
        console.log('комментарий был создан, но не найден')
        res.sendStatus(504)
        return
    }
    res.status(201).send(updateComment)
};