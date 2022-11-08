export interface IProjectCreate{
    
    name:string
    description:string
    stack:string
    url_image:string
    skills: Array<string>
    token?:string

}