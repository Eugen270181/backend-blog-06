import {Request, Response} from 'express'
import {commentsQueryRepository} from "../repositories/commentsQueryRepository";
import {inputQuerySanitizer} from "../../../common/module/inputQuerySanitizer";
import {validQueryType} from "../../../common/types/valid-query-type";
import {anyQueryType} from "../../../common/types/any-query-type";
import {pagUserOutputModel} from "../types/output/pag-user-output.type";

export const getCommentsController = async (req:Request, res:Response<pagUserOutputModel>) => {
    const sanitizedQuery:validQueryType = inputQuerySanitizer(req.query as anyQueryType)
    const foundUsers = await commentsQueryRepository.getUsersAndMap(sanitizedQuery)
    res.status(200).send(foundUsers)
    return
}