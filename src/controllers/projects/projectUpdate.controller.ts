import {Request, Response} from 'express'
import projectUpdateService from '../../services/projects/projectUpdate.service'

const projectUpdateController = async (req:Request,res:Response) => {
    const {name,description,stack,url_image,skills} = req.body
    const token = req.headers.authorization
    const id = req.params.id

    try {
        
        const projectUpdated = await projectUpdateService({name,description,stack,url_image,skills,token},id)

        return res.status(200).json(projectUpdated)
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                "error":error.name,
                "message":error.message
            })
        }
    }
}
export default projectUpdateController

