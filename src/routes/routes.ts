import { Router } from "express";

const routes = Router()


import userCreateController from "../controllers/user/userCreate.controller";
import userListController from "../controllers/user/userList.controller";

routes.post('/users',userCreateController)
routes.get('/users',userListController)

export default routes