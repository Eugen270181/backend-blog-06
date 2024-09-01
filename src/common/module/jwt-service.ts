import {UserDbModel} from "../types/db/user-db.model";
import {SETTINGS} from "../../settings";
import {WithId} from "mongodb"
import jwt, {JwtPayload} from 'jsonwebtoken'


export const jwtService = {
    createJWT(user:WithId<UserDbModel>):string {
        return jwt.sign({userId:user._id.toString()},SETTINGS.SECRET_KEY,{expiresIn:'1h'})
    },
    getUserByIdToken(token:string){
        try {
            const result = jwt.verify(token, SETTINGS.SECRET_KEY) as JwtPayload
            return result.userId.toString()
        }
        catch (e) {
            return null
        }

    }
}