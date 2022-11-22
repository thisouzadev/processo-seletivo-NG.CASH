import { Transactions } from './entities/Transactions';
import { AccountsController } from './controllers/AccountsController';
import { Router } from 'express'
import { validateToken } from "./middlewares/auth";
import { UsersController } from './controllers/UsersController'

const routes = Router()

routes.post('/users', new UsersController().create)
routes.post("/login", new UsersController().login)
routes.get('/users', validateToken, new UsersController().getAllUser)

routes.get("/balance", validateToken, new AccountsController().list)
routes.post("/transactions", validateToken, new AccountsController().transactionsCreate)
routes.get("/transactions", validateToken, new AccountsController().getAllMyTransactions)
export default routes
