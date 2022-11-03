import { Router } from "express";

const routes = Router()


import userCreateController from "../controllers/user/userCreate.controller";
import userListController from "../controllers/user/userList.controller";
import loginController from '../controllers/login/login.controller'
import userListOneController from "../controllers/user/userListOne.controller";
import skillCreateController from "../controllers/skills/skillCreate.controller";
import skillGetUserController from "../controllers/skills/skillGetUser.controller";
import skillDeleteController from "../controllers/skills/skillDelete.controller";
import skillUpdateController from "../controllers/skills/skillUpdate.controller";


routes.post('/users',userCreateController)
routes.get('/users',userListController)
routes.get('/users/me',userListOneController)

routes.post('/login',loginController)

routes.post('/skills',skillCreateController)
routes.get('/skills',skillGetUserController)
routes.delete('/skills/:id',skillDeleteController)
routes.patch('/skills/:id',skillUpdateController)

export default routes