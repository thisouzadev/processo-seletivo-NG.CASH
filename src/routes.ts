import { Router } from 'express'
import { checkJwt } from "./middlewares/checkJwt";
import { UsersController } from './controllers/UsersController'

const routes = Router()

routes.post('/users', new UsersController().create)
routes.get('/users', new UsersController().list)

routes.post("/login", new UsersController().login);

export default routes
