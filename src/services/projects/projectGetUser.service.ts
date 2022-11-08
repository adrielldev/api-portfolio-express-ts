import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import jwt from 'jsonwebtoken'
import { Project } from "../../entities/projects.entity";


const projectGetUserService = async (token?:string) => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find({
        relations:{
            projects:true
        }
    })
    const projectRepository = AppDataSource.getRepository(Project)
    const allProjects = await projectRepository.find({
        relations:{
            skills:true
        }
    })

    let projects:any = []
    let projectsReturned:any = []

    if(!token){
        throw new Error("No token token found")
    }
    token = token.split(" ")[1]

    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        if (!decoded) {
            throw new Error("Invalid token")
        }
        if(typeof(decoded)== 'object'){
            const user = users.find(user => user.email === decoded.email)
            if(user){
            projects = user.projects
            for(let i:number = 0; i< projects.length;i++){
               let aProject = allProjects.find(proj => proj.id === projects[i].id)
               projectsReturned.push(aProject)
            }
        }
            return user
        }        
    })

    return projectsReturned




}

export default projectGetUserService