import { Request, Response } from "express";
import { EntryService } from "../services/EntryService";
import { UserService } from "../services/UserService";

export const all = async (req: Request, res: Response) => {
  const entry = await EntryService.findAll();
  res.json({ entry });
};

export const findAllByDesc = async (req: Request, res: Response) => {
  const { description } = req.body;

  if (description) {
    const entry = await EntryService.findAllByDesc({ description });

    if (entry.length !== 0) {
      res.json({ entry });
    } else {
      res.json({ error: "Não foram encontrados entradas para esta pesquisa!" });
    }
  } else {
    res.json({ error: "Descrição não pode ser vazia!" });
  }
};

export const addEntry = async (req: Request, res: Response) => {
  const { description, date_in, value, id_user } = req.body;

  if (description && date_in && value && id_user) {
    const user = await UserService.findOne({
      id: parseInt(id_user),
    });

    if (user) {
      const entry = await EntryService.create({
        description,
        date_in,
        value: parseFloat(value),
        id_user: user.id,
      });

      res.status(201).json({ entry });
    } else {
      res.json({ error: "Usuário não existe." });
    }
  } else {
    res.json({ error: "Dados não preenchidos!" });
  }
};
