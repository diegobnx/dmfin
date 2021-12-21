import { Request, Response } from "express";
import { DebtService } from "../services/DebtService";
import { UserService } from "../services/UserService";

export const all = async (req: Request, res: Response) => {
  const debts = await DebtService.findAll();
  res.json({ debts });
};

export const findAllByDesc = async (req: Request, res: Response) => {
  const { description } = req.body;

  if (description) {
    const debts = await DebtService.findAllByDesc({ description });

    if (debts.length !== 0) {
      res.json({ debts });
    } else {
      res.json({error: 'Não foram encontrados débitos para esta pesquisa!'})
    }
  } else {
    res.json({ error: "Descrição não encontrada!" });
  }
};

export const addDebts = async (req: Request, res: Response) => {
  const { description, date_exp, value, status_pag, id_user } = req.body;

  if (description && date_exp && value && status_pag && id_user) {
    const user = await UserService.findOne({
      id: parseInt(id_user),
    });
    if (user) {
      const debt = await DebtService.create({
        description,
        date_exp: date_exp,
        value: parseFloat(value),
        status_pag: Boolean(status_pag),
        id_user: user.id,
      });

      res.status(201).json({ debt });
    } else {
      res.json({ error: "Usuário não existe!" });
    }
  } else {
    res.json({ error: "Dados não preenchidos!" });
  }
};
