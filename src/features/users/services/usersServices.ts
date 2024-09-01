import {usersRepository} from "../repositories/usersRepository";
import {ObjectId} from "bson";
import {CreateUserInputModel} from "../types/input/create-user-input.type";
import {UserDbModel} from "../../../common/types/db/user-db.model";
//import {OutputErrorsType} from "../../../common/types/output-errors-type";
import {hashServices} from "../../../common/module/hashServices";


enum StatusCode {
    NoSuccess,
    Success
}

type Result<T> = {
    data:T,
    statusCode:StatusCode
}
//const ErrorObject = ( message: string, field: string ):OutputErrorsType => {
//    return { errorsMessages: [ {message, field} ] }
//}

export const usersServices = {
    async createUser(user: CreateUserInputModel):Promise<Result<string>> {
        const {login, password, email} = user

        if (await usersRepository.findUserByLogin(login)) return { data:'login', statusCode:0 }

        if (await usersRepository.findUserByEmail(email)) return { data:'email', statusCode:0 }

        const newUser:UserDbModel = {
            ...{login,email},
            passHash: await hashServices.getHash(password),
            createdAt: new Date().toISOString()
        }
        const newUserId = await usersRepository.createUser(newUser)
        return { data:newUserId, statusCode:1 }
    },
    async deleteUser(id:string){
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return false
        return usersRepository.deleteUser(new ObjectId(id))
    }
}