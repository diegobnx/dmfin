import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { UserService } from "../services/UserService";

export const all = async (req: Request, res: Response) => {
  const products = await ProductService.findAll();
  res.json({ products });
};

export const findAllByDesc = async (req: Request, res: Response) => {
  const { description } = req.body;

  if (description) {
    const products = await ProductService.findAllByDesc({ description });

    if (products.length !== 0) {
      res.json({ products });
    } else {
      res.json({ error: "Não foram encontrados produtos para esta pesquisa!" });
    }
  } else {
    res.json({ error: "Descrição não pode ser vazia!" });
  }
};

export const findAllByCategory = async (req: Request, res: Response) => {
  const { category } = req.body;

  if (category) {
    const products = await ProductService.findAllByCategory({ category });

    if (products.length !== 0) {
      res.json({ products });
    } else {
      res.json({ error: "Não foram encontrados produtos para esta pesquisa!" });
    }
  } else {
    res.json({ error: "Categoria não pode ser vazia!" });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const { description, price, category, quantity, id_user } = req.body;

  if (description && price && category && quantity && id_user) {
    const user = await UserService.findOne({
      id: parseInt(id_user),
    });

    if (user) {
      const product = await ProductService.create({
        description,
        price: parseFloat(price),
        category,
        quantity: parseInt(quantity),
        id_user: user.id,
      });

      res.status(201).json({ product });
    } else {
      res.json({ error: "Usuário não existe." });
    }
  } else {
    res.json({ error: "Dados não preenchidos!" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, price, category, quantity, id_user } = req.body;

  if (description && price && category && quantity && id_user) {
    const product = await ProductService.findOne(parseInt(id));

    if (product) {
      const user = await UserService.findOne({
        id: parseInt(id_user),
      });
      if (user) {
        const productUpdated = await ProductService.update(product.id, {
          description,
          price: parseFloat(price),
          category,
          quantity: parseInt(quantity),
          id_user: user.id,
        });

        res.json({ productUpdated });
      } else {
        res.json({ error: "Usuário não encontrado!" });
      }
    } else {
      res.json({ error: "Produto não existe!" });
    }
  } else {
    res.json({ error: "Dados não preenchidos!" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.findOne(parseInt(id));

  if (product) {
    await ProductService.delete(parseInt(id));

    res.json({ status: true });
  } else {
    res.json({ error: "Produto não existe." });
  }
};
