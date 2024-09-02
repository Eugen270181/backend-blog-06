import {Router} from 'express'
import {commentValidators} from "./middlewares/commentValidators";
import {adminMiddleware} from "../../common/middleware/admin-middleware";
import {getCommentsController} from "./controllers/getCommentsController";
import {createCommentController} from "./controllers/createCommentController";
import {delCommentController} from "./controllers/delCommentController";


export const commentsRouter = Router()

commentsRouter.get('/', adminMiddleware, getCommentsController)
commentsRouter.post('/', adminMiddleware,...commentValidators, createCommentController)
commentsRouter.delete('/:id', adminMiddleware, delCommentController)


// не забудьте добавить роут в апп