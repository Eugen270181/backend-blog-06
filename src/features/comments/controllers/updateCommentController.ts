import {Response, Request} from 'express'
import {commentsServices} from "../services/commentsServices";
import {commentsQueryRepository} from "../repositories/commentsQueryRepository";
import {OutputErrorsType} from "../../../common/types/output-errors-type";
import {CreateCommentInputType} from "../types/input/create-comment-input.type";
import {CommentOutputModel} from "../types/output/comment-output.type";


export const updateCommentController = async (req: Request<any, any, CreateCommentInputType>, res: Response<CommentOutputModel|OutputErrorsType>) => {
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