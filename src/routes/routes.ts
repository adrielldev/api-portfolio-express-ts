import { Router } from "express";

const routes = Router()


import userCreateController from "../controllers/user/userCreate.controller";
import userListController from "../controllers/user/userList.controller";
import loginController from '../controllers/login/login.controller'


routes.post('/users',userCreateController)
routes.get('/users',userListController)
routes.post('/login',loginController)

export default routes