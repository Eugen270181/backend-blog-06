import {LoginInputModel} from "../types/input/login-input.model";
import {hashServices} from "../../../common/module/hashServices";
import {usersRepository} from "../../users/repositories/usersRepository";
import {ResultObject} from "../../../common/types/result-object-type";
import {WithId} from "mongodb";
import {UserDbModel} from "../../../common/types/db/user-db.model";

export const authServices = {
    async isLogin(login:LoginInputModel):Promise< ResultObject<string> > {
        const {loginOrEmail, password} = login
        const user=await usersRepository.getUserByCredentials(loginOrEmail)
        if (!user) return {statusCode:0}
        if (!hashServices.checkHash(password, user.passHash)) return {data:user._id.toString(),statusCode:0}
        return {data:user._id.toString(),statusCode:1}
    }
}