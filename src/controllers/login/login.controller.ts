import {Request, Response} from 'express'
import loginService from '../../services/login/login.service'


const loginController = async (req:Request,res:Response) => {
    const {email,password} = req.body
    try {
        const token = await loginService({email,password})

        return res.status(200).json({"token":token})
    } catch (err) {

        if (err instanceof Error) {

            return res.status(401).send({
                "error": err.name,
                "message": err.message
            })
        }
    }


}

export default loginController