import { Router } from "express";

const routes = Router()


import userCreateController from "../controllers/user/userCreate.controller";
import userListController from "../controllers/user/userList.controller";
import userListOneController from "../controllers/user/userListOne.controller";

import loginController from '../controllers/login/login.controller'

import skillCreateController from "../controllers/skills/skillCreate.controller";
import skillGetUserController from "../controllers/skills/skillGetUser.controller";
import skillDeleteController from "../controllers/skills/skillDelete.controller";
import skillUpdateController from "../controllers/skills/skillUpdate.controller";

import projectCreateController from "../controllers/projects/projectCreate.controller";
import projectGetUserController from "../controllers/projects/projectGetUser.controller";
import projectDeleteController from "../controllers/projects/projectDelete.controller";
import projectUpdateController from "../controllers/projects/projectUpdate.controller";



routes.post('/users',userCreateController)
routes.get('/users',userListController)
routes.get('/users/me',userListOneController)

routes.post('/login',loginController)

routes.post('/skills',skillCreateController)
routes.get('/skills',skillGetUserController)
routes.delete('/skills/:id',skillDeleteController)
routes.patch('/skills/:id',skillUpdateController)

routes.post('/projects',projectCreateController)
routes.get('/projects',projectGetUserController)
routes.delete('/projects/:id',projectDeleteController)
routes.patch('/projects/:id',projectUpdateController)


export default routes