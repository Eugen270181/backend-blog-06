import {UserDbModel} from "./db/user-db.model";


declare global {
    declare namespace Express {
        export interface Request {
            user: UserDbModel | null
        }
    }
}