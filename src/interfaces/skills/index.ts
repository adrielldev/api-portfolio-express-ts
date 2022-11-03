export interface ISkillCreate {
    name:string
    type:string
    url_image:string
    token?:string
}

export interface ISkillDeleteOrUpdate{
    token?:string
    id:string
    url_image?:string
}