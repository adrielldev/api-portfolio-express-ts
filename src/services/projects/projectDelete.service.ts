import { Project } from "../../entities/projects.entity"
import { AppDataSource } from "../../data-source"
import jwt from 'jsonwebtoken'


const projectDeleteService = async (id:any,token?:string) => {

    const projectRepository = AppDataSource.getRepository(Project)
    const project = await projectRepository.findOneBy(id)
    if(!token){
        throw new Error("No authorization token found")
    }
    token = token.split(" ")[1]

    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        if (!decoded) {
            throw new Error("Invalid token")
        }
    })

    if(project){
        projectRepository.delete(project)
    }else{
        throw new Error('Project not found')
    }
}


export default projectDeleteService