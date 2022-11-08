import { IProjectCreate } from "../../interfaces/projects"
import { AppDataSource } from "../../data-source"
import { Skill } from "../../entities/skills.entity"
import { Project } from "../../entities/projects.entity"
import { User } from "../../entities/user.entity"
import jwt from 'jsonwebtoken'


const projectCreateService = async ({name,description,stack,url_image,skills,token}:IProjectCreate) => {

    // checar se a skill existe, se nao, cria-la
    const skillRepository = AppDataSource.getRepository(Skill)
    const userRepository = AppDataSource.getRepository(User)
    const projectRepository = AppDataSource.getRepository(Project)

    const projects = await projectRepository.find({
        relations:{
            skills:true
        }
    })
    const users = await userRepository.find({
        relations:{
            skills:true,
            projects:true
        }
    })

    const allSkills = await skillRepository.find()

    if (!token){
        throw new Error("No authorization token found")
    }

    token = token.split(" ")[1]

    const project = new Project()
    project.name = name
    project.description = description
    project.stack = stack
    project.url_image = url_image

    const account = jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        let user;
        if (!decoded) {
            throw new Error("Invalid token")
        }
        if(typeof(decoded)== 'object'){
            user = users.find(user => user.email === decoded.email)
            if(user){

            project.skills = []
            skills.forEach((skill)=>{
            const skillExist =  allSkills.find(skillRepo=> skillRepo.name === skill)
                if(!skillExist){
                    throw new Error('You need to add this skill to your skills to upload a project that has it')
                }
                project.skills.push(skillExist)
        })
        project.user = user
        user.projects.push(project)
        userRepository.save(user)
        projectRepository.save(project)


            }
        }        
        return user
    })

    const projectReturned = {
        id:project.id,
        name:name,
        description:description,
        stack:stack,
        url_image:url_image,
        skills:skills
    }

    return projectReturned


}


export default projectCreateService