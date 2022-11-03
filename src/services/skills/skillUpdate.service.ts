import { AppDataSource } from "../../data-source";
import { Skill } from "../../entities/skills.entity";
import { ISkillDeleteOrUpdate } from "../../interfaces/skills";
import jwt from "jsonwebtoken";

const skillUpdateService = async ({token,id,url_image}:ISkillDeleteOrUpdate) => {
    const skillRepository = AppDataSource.getRepository(Skill)
    
    console.log(token,id)
    if(!token){
        throw new Error("No authorization token found")
    }
    token = token.split(" ")[1]

    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        if (!decoded) {
            throw new Error("Invalid token")
        }
    })
    const skill = await skillRepository.findOneBy({
        id:id
    })
    const skillUpdated = new Skill()
    if(skill){
        
        skillUpdated.name = skill.name
        skillUpdated.type = skill.type
        skillUpdated.url_image = url_image || skill.url_image
    }
    await skillRepository.update(id,skillUpdated)

    return skillUpdated
    


}


export default skillUpdateService