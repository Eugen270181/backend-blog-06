import {Response, Request} from 'express'
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";
import {CreateBlogPostInputModel} from "../../posts/types/input/create-blog-post-input.type";
import {PostOutputModel} from "../../posts/types/output/post-output.type";
import {postsQueryRepository} from "../../posts/repository/postsQueryRepository";
import {postsServices} from "../../posts/services/postsServices";
import {commentsServices} from "../../comments/services/commentsServices";
import {postsRepository} from "../repository/postsRepository";
import {CreateCommentInputModel} from "../../comments/types/input/create-comment-input.model";
import {CommentOutputModel} from "../../comments/types/output/comment-output.type";
import {commentsQueryRepository} from "../../comments/repositories/commentsQueryRepository";



export const createPostCommentController = async (req: Request<{id:string}, any, CreateCommentInputModel>, res: Response<CommentOutputModel>) => {
    const user = req.user!
    const postId = req.params.id
    const foundPost = await postsRepository.findPostById(postId)
    if (!foundPost) {
        res.sendStatus(404)
        return
    }
    //TODO:relase calling func createComment
    const newCommentId = await commentsServices.createComment({...req.body},postId,user)
    const newComment = await commentsQueryRepository.findCommentAndMap(newCommentId)
    //TODO:different response
    if (!newComment) {
        console.log('комментарий был создан, но не найден')
        res.sendStatus(504)
        return
    }
    res.status(201).send(newComment)
}