import {Router} from 'express'
import {commentValidators} from "./middlewares/commentValidators";
import {adminMiddleware} from "../../common/middleware/admin-middleware";
import {getCommentsController} from "./controllers/getCommentsController";
import {delCommentController} from "./controllers/delCommentController";
import {updateCommentController} from "./controllers/updateCommentController";


export const commentsRouter = Router()

commentsRouter.get('/', adminMiddleware, getCommentsController)
commentsRouter.put('/', adminMiddleware,...commentValidators, updateCommentController)
commentsRouter.delete('/:id', adminMiddleware, delCommentController)


// не забудьте добавить роут в апп