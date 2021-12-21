import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { generateToken } from "../config/passport";
import bcrypt from "bcryptjs";

export const create = async (req: Request, res: Response) => {
  if (req.body.email && req.body.pass) {
    let { email, pass, name } = req.body;
    let hasUser = await UserService.findOne({ email });

    if (!hasUser) {
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(pass, salt);

      let newUser = await UserService.create({ email, password, name });

      //const token = generateToken({ id: newUser.id });

      res.status(201);
      res.json({ message: `Usuário: ${newUser.name} criado com sucesso!` });
    } else {
      res.json({ error: "Já existe um usuário usando este e-mail!" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  if (req.body.email && req.body.pass) {
    let { email, pass } = req.body;
    let user = await UserService.findOne({ email });

    if (user) {
      const password = bcrypt.compareSync(pass, user!.password);

      if (password) {
        const token = generateToken({ id: user!.id });
        res.json({ status: true, token });
        return;
      }
    }
  }
  res.json({ status: false, error: "Usuário ou Senha Incorretos!" });
};

export const profile = async (req: Request, res: Response) => {
  res.json({
    status: true,
    message: "Bem vindo a pagina de perfil de usuário.",
  });
};
