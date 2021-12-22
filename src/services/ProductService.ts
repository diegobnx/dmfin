import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type findDataProp = {
  description?: string;
  category?: string;
};

type createDataProp = {
  description: string;
  price: number;
  category: string;
  quantity: number;
  id_user: number;
};

type updateDataProp = {
  description?: string;
  price?: number;
  category?: string;
  quantity?: number;
  id_user?: number;
};

export const ProductService = {
  findAll: async () => {
    return await prisma.product.findMany({});
  },

  findOne: async (id: number) => {
    return await prisma.product.findUnique({
      where: { id },
    });
  },

  findAllByDesc: async (data: findDataProp) => {
    return await prisma.product.findMany({
      where: {
        description: {
          contains: data.description,
        },
      },
      orderBy: { description: "desc" },
    });
  },

  findAllByCategory: async (data: findDataProp) => {
    return await prisma.product.findMany({
      where: {
        category: {
          contains: data.category,
        },
      },
    });
  },

  create: async (data: createDataProp) => {
    return await prisma.product.create({ data });
  },

  update: async (id: number, data: updateDataProp) => {
    return await prisma.product.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return await prisma.product.delete({
      where: { id },
    });
  },
};
