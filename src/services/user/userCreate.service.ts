import { AppDataSource } from '../../data-source'
import { User } from '../../entities/user.entity'


import { IUserCreate,IUser } from '../../interfaces/user'

import {v4 as uuidv4} from 'uuid'




const userCreateService = async ({name,email,password,projects,skills}:IUserCreate) => {
    
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email === email)
    if( emailAlreadyExists){
        throw new Error("email already exists")
    }
    const user = new User()
    user.name = name
    user.password = password
    user.email = email
    user.projects = projects
    user.skills = skills

    
    userRepository.create(user)
    await userRepository.save(user)
    const userReturned = {name,email,projects,skills}

    return userReturned
}

export default userCreateService
