import {commentsRepository} from "../repositories/commentsRepository";
import {ObjectId} from "bson";
import {hashServices} from "../../../common/module/hashServices";
import {CreateCommentInputModel} from "../types/input/create-comment-input.model";
import {CommentDbModel} from "../../../common/types/db/comment-db.model";
import {UserDbModel} from "../../../common/types/db/user-db.model";
import {WithId} from "mongodb";
import {UpdatePostInputModel} from "../../posts/types/input/update-post-input.type";
import {blogsRepository} from "../../blogs/repositories/blogsRepository";
import {postsRepository} from "../../posts/repository/postsRepository";
import {UpdateCommentInputModel} from "../types/input/update-comment-input.model";



enum StatusCode {
    NoSuccess,
    Success,
    Forbidden
}

type Result<T> = {
    data:T,
    statusCode:StatusCode
}


export const commentsServices = {
    async createComment(comment: CreateCommentInputModel, postId:string, user:WithId<UserDbModel>):Promise<Result<string>> {
        const {content} = comment
        const newComment:CommentDbModel = {
            ...{content},
            commentatorInfo:{userId:user._id.toString(),userLogin:user.login},
            createdAt: new Date().toISOString(),
            postId
        }
        const newCommentId = await commentsRepository.createComment(newComment)
        return { data:newCommentId, statusCode:1 }
    },
    async deleteComment(id:string){
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return false
        return commentsRepository.deleteComment(new ObjectId(id))
    },
    async updateComment(comment: UpdateCommentInputModel, id: string,user:WithId<UserDbModel>) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return false
        const {content} = comment
        return commentsRepository.updateComment({content},id)
    },
}