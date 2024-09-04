import {Router} from 'express'
import {commentValidators} from "./middlewares/commentValidators";
import {adminMiddleware} from "../../common/middleware/admin-middleware";
import {findPostCommentsController} from "../posts/controllers/findPostCommentsController";
import {delCommentController} from "./controllers/delCommentController";
import {updateCommentController} from "./controllers/updateCommentController";
import {authMiddleware} from "../../common/middleware/auth-middleware";
import {findCommentController} from "./controllers/findCommentController";


export const commentsRouter = Router()

commentsRouter.get('/:id', findCommentController)
commentsRouter.put('/', authMiddleware,...commentValidators, updateCommentController)
commentsRouter.delete('/:id', authMiddleware, delCommentController)


// не забудьте добавить роут в апп