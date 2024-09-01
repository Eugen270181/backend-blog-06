import {blogCollection, postCollection, userCollection} from "../../../common/module/db/dbMongo"


export const testingRepository = {
    async clearDB() {
        try {
            await blogCollection.drop()
            await postCollection.drop()
            await userCollection.drop()
            console.log('drop blog and post collections')
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    },
}