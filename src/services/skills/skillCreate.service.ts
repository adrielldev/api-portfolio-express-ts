import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { Skill } from "../../entities/skills.entity"
import { ISkillCreate } from "../../interfaces/skills"
import jwt from "jsonwebtoken";



const skillCreateService = async ({name,type,url_image,token}:ISkillCreate) => {
    const userRepository = AppDataSource.getRepository(User)
    const skillRepository = AppDataSource.getRepository(Skill)
    
    const users = await userRepository.find({relations:{
        skills:true,
        projects:true
    }})
    const skills = await skillRepository.find({relations:{
        user:false
    }})
    
    if (!token){
        throw new Error("No authorization token found")
    }

    token = token.split(" ")[1]

    const skill = new Skill()
    skill.name = name
    skill.type = type
    skill.url_image = url_image

    const account = jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        if (!decoded) {
            throw new Error("Invalid token")
        }
        if(typeof(decoded)== 'object'){
            const user = users.find(user => user.email === decoded.email)
            if(user){
                skill.user = user
                user.skills.push(skill)
                userRepository.save(user)
            }
            


            return skill
        }        
    })
    await skillRepository.save(skill)
    const skill_returned = {
        id:skill.id,
        name:skill.name,
        type:skill.type,
        url_image:skill.url_image
    }
    return skill_returned
    


}

export default skillCreateService