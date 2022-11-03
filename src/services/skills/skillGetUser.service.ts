import { IUserAuth } from "../../interfaces/user";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import jwt from "jsonwebtoken";

const skillGetUserService = async ({authorization}:IUserAuth) =>{
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find({relations:{
        skills:true
    }})
    let skills:any = []

    if(!authorization){
        throw new Error("No authorization token found")
    }
    const token = authorization.split(" ")[1]

    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        if (!decoded) {
            throw new Error("Invalid token")
        }
        if(typeof(decoded)== 'object'){
            const user = users.find(user => user.email === decoded.email)
            if(user){
                skills = user.skills
            }
            return user
        }        
    })

    return skills
}

export default skillGetUserService