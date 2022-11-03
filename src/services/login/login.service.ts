import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { ILogin } from "../../interfaces/login";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginService = async ({email,password}:ILogin) => {
    const UserRepository = AppDataSource.getRepository(User)
    const users = await UserRepository.find()

    const account = users.find(user => user.email === email)
    if (!account) {
        throw new Error("Account not found")
    }
    if(!bcrypt.compareSync(password,account?.password)){
        throw new Error("Wrong email or password")
    }    
    const token = jwt.sign(
        {email:email},
        String(process.env.JWT_SECRET),
        {expiresIn:'1d'}
    
    )
    return token
}
export default loginService