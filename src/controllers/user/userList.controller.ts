import {Request,Response} from 'express'
import { IUser } from '../../interfaces/user'

import userListService from '../../services/user/userLIst.service'

const userListController = async (req:Request,res:Response) => {
    try {
        const users = await userListService()
        return res.status(200).json(users)

    } catch(err){
        if(err instanceof Error){
            return res.status(400).json({
                "error":err.name,
                "message":err.message
            })
        }
    }
}
export default userListController