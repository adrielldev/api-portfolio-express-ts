export interface IUser{
    id:string
    name:string
    email:string
    password:string
    projects:Array<String>[]
    skills:Array<String>[]

}

export interface IUserCreate{
    name:string
    email:string
    password:string
    projects:Array<String>[]
    skills:Array<String>[]
}



