import {Request, Response} from 'express'
import projectDeleteService from '../../services/projects/projectDelete.service'

const projectDeleteController = async (req:Request,res:Response) => {
    const token = req.headers.authorization
    const id = req.params

    try {
        await projectDeleteService(id,token)
        
        return res.status(204).json()
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                "error":error.name,
                "message":error.message
            })
        }
    }
}
export default projectDeleteController

