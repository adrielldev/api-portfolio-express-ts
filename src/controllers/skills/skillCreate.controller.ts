import {Request, Response} from 'express'
import skillCreateService from '../../services/skills/skillCreate.service'


const skillCreateController = async (req:Request,res:Response) => {
    const {name,type,url_image} = req.body
    const token = req.headers.authorization
    try {
        const skill = await skillCreateService({name,type,url_image,token})
        return res.status(201).json(skill)
        
    } catch(err){
        if (err instanceof Error){
            return res.status(400).send({
                "error":err.name,
                "message":err.message
            })
        }
    }
    
}

export default skillCreateController

