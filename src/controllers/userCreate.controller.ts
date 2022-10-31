import {Request, Response} from 'express'


const userCreateController = (req:Request,res:Response) => {

    try {
        
    } catch(err){
        if (err instanceof Error){
            return res.status(400).send({
                "error":err.name,
                "message":err.message
            })
        }
    }
}

export default userCreateController
