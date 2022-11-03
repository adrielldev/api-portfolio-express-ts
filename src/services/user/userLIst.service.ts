import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"


const userListService = async () => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find({
        relations:{
            skills:true,
            projects:true
        }
    })
    

    return users
}

export default userListService

