import {Request,Response} from 'express'
import skillUpdateService from '../../services/skills/skillUpdate.service'

const skillUpdateController = async (req:Request,res:Response) =>{
    const {url_image} = req.body
    const {id} = req.params
    const token = req.headers.authorization
    try {
        const skillUpdated = await skillUpdateService({url_image,id,token})
        return res.status(200).send(skillUpdated)    
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                "error":error.name,
                "message":error.message
            })
        }
    }


}


export default skillUpdateController


