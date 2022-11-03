import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserListOne } from "../../interfaces/user/index"
import jwt from "jsonwebtoken";


const userListOneService = async ({authorization}:IUserListOne) => {

    const userRepository = AppDataSource.getRepository(User) 

    const users = await userRepository.find()

    if (!authorization){
        throw new Error("No authorization token found")
    }

    const token = authorization.split(" ")[1]

    const account = jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        if (!decoded) {
            throw new Error("Invalid token")
        }
        if(typeof(decoded)== 'object'){
            const user = users.find(user => user.email === decoded.email)
            return user
        }        
    })

    return account
}

export default userListOneService