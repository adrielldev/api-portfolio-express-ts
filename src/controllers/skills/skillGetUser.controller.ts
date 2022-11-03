import {Request,Response} from 'express'
import skillGetUserService from '../../services/skills/skillGetUser.service'


const skillGetUserController = async (req:Request,res:Response) => {
    const token = req.headers.authorization
    try {
        const skills = await skillGetUserService({authorization:token})
        return res.status(200).send(skills)
        
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                "error":error.name,
                "message":error.message
            })
        }
    }


}


export default skillGetUserController