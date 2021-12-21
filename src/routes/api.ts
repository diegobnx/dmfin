import { Router } from 'express';
import { privateRoute } from '../config/passport';
import * as UserController from "../controllers/userController";
import * as DebtController from "../controllers/debtController";

const router = Router();

router.post("/users/register", UserController.create);
router.post("/users/login", UserController.login);

router.get("/perfil", privateRoute, UserController.profile);

router.post("/debts/register", privateRoute, DebtController.addDebts);
router.get("/debts/findall", privateRoute, DebtController.all);
router.get("/debts/findallbydesc", privateRoute, DebtController.findAllByDesc);

export default router;