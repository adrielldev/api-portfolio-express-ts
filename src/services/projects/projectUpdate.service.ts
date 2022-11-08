import { AppDataSource } from "../../data-source";

import { Project } from "../../entities/projects.entity";
import { IProjectCreate } from "../../interfaces/projects";
import { Skill } from "../../entities/skills.entity";

import jwt from 'jsonwebtoken'

const projectUpdateService = async ({name,description,stack,skills,url_image,token}:IProjectCreate,id:any) => {
   const projectRepository = AppDataSource.getRepository(Project)
   const projects = await projectRepository.find({relations:{
    skills:true
   }})
   const skillRepository = AppDataSource.getRepository(Skill)
   const allSkills = await skillRepository.find()
   if(!token){
    throw new Error("No authorization token found")
}
    token = token.split(" ")[1]

    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        if (!decoded) {
            throw new Error("Invalid token")
        }
    })
   let projectReturned;
    const project = projects.find(project => project.id === id)


   if(project){
    project.name = name || project.name
    project.description = description || project.description
    project.stack = stack || project.stack
    project.url_image = url_image || project.url_image
    if(skills){

    
    skills.forEach((skill)=>{
        const skillExist =  allSkills.find(skillRepo=> skillRepo.name === skill)
            if(!skillExist){
                throw new Error('You need to add this skill to your skills to upload a project that has it')
            }
            project.skills.push(skillExist)
    })
}
    await projectRepository.save(project)

    projectReturned = {
        id:project.id,
        name: project.name,
        description:project.description,
        stack:project.stack,
        url_image:project.url_image,
        skills: project.skills
       }

   }
   
   return projectReturned

   

}


export default projectUpdateService