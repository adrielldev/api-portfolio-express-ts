import { AppDataSource } from "../../data-source";
import { Skill } from "../../entities/skills.entity";
import { ISkillDeleteOrUpdate } from "../../interfaces/skills";
import jwt from "jsonwebtoken";

const skillDeleteService = async ({token,id}:ISkillDeleteOrUpdate) => {
    const skillRepository = AppDataSource.getRepository(Skill)
    const skills = await skillRepository.find()
    if(!token){
        throw new Error("No authorization token found")
    }
    token = token.split(" ")[1]

    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        if (!decoded) {
            throw new Error("Invalid token")
        }
    })

    const skill = skills.find(skill => skill.id === id)
    if(skill){
        skillRepository.delete(skill)
    }else{
        throw new Error("Id inválido")
    }
    



}


export default skillDeleteService