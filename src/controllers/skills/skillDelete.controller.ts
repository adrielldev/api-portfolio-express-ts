import {Request,Response} from 'express'
import skillDeleteService from '../../services/skills/skillDelete.service'

const skillDeleteController = async (req:Request,res:Response) => {
    const token = req.headers.authorization
    const {id} = req.params 
    try {
        await skillDeleteService({token,id})
        return res.status(204).json({"message":"Token excluído com sucesso"})
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                "error":error.name,
                "message":error.message
            })
        }
    }
}

export default skillDeleteController
