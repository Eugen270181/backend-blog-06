import {commentsRepository} from "../repositories/commentsRepository";
import {ObjectId} from "bson";
import {hashServices} from "../../../common/module/hashServices";
import {CreateCommentInputType} from "../types/input/create-comment-input.type";
import {CommentDbModel} from "../../../common/types/db/comment-db.model";



enum StatusCode {
    NoSuccess,
    Success
}

type Result<T> = {
    data:T,
    statusCode:StatusCode
}


export const commentsServices = {
    async createComment(comment: CreateCommentInputType):Promise<Result<string>> {
        const {content} = comment
        const newComment:CommentDbModel = {
            ...{login,email},
            passHash: await hashServices.getHash(password),
            createdAt: new Date().toISOString()
        }
        const newUserId = await commentsRepository.createUser(newUser)
        return { data:newUserId, statusCode:1 }
    },
    async deleteUser(id:string){
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return false
        return commentsRepository.deleteUser(new ObjectId(id))
    }
}