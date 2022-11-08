import {Request, Response} from 'express'
import projectCreateService from '../../services/projects/projectCreate.service'

const projectCreateController = async (req:Request,res:Response) => {
   const {name,description,stack,url_image,skills} = req.body
   const token = req.headers.authorization
    try {
        const projectCreated = await projectCreateService({name,description,stack,url_image,skills,token})
        return res.status(201).json(projectCreated)
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                "error":error.name,
                "message":error.message
            })
        }
    }
}

export default projectCreateController