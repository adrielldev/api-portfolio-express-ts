import { Skill } from "../../entities/skills.entity"
import { Project } from "../../entities/projects.entity"

export interface IUser{
    id:string
    name:string
    email:string
    password:string
    projects:Project[]
    skills:Skill[]

}

export interface IUserCreate{
    name:string
    email:string
    description:string
    password:string
    projects:Project[]
    skills:Skill[]
}

export interface IUserListOne{
    authorization?:string
}


