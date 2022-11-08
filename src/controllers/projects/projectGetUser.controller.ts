import {Request, Response} from 'express'
import projectGetUserService from '../../services/projects/projectGetUser.service'


const projectGetUserController = async (req:Request,res:Response) => {
    const token = req.headers.authorization

    try {
        const projects = await projectGetUserService(token)
        return res.status(200).json(projects)
        
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                "error":error.name,
                "message":error.message
            })
        }
    }
}
export default projectGetUserController

