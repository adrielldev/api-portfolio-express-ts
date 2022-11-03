import { AppDataSource } from '../../data-source'
import { User } from '../../entities/user.entity'


import { IUserCreate} from '../../interfaces/user'

import bcrypt from 'bcrypt'


const userCreateService = async ({name,email,password,description,projects,skills}:IUserCreate) => {
    
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email === email)
    if( emailAlreadyExists){
        throw new Error("email already exists")
    }
    const user = new User()
    user.name = name
    user.password = bcrypt.hashSync(password,10)
    user.email = email
    user.description = description
    user.projects = projects
    user.skills = skills

    
    userRepository.create(user)
    await userRepository.save(user)
    const userReturned = {name,email,description,projects,skills}

    return userReturned
}

export default userCreateService
