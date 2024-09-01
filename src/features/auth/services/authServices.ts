import {LoginInputModel} from "../types/input/login-input.model";
import {hashServices} from "../../../common/module/hashServices";
import {usersRepository} from "../../users/repositories/usersRepository";


export const authServices = {
    async isLogin(login:LoginInputModel):Promise<boolean> {
        const {loginOrEmail, password} = login
        const user=await usersRepository.findUserByCredentials(loginOrEmail)
        if (!user) return false
        return hashServices.checkHash(password, user.passHash)
    }
}