import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type findDataProp = {
  description: string;
};

type createDataProp = {
  description: string;
  date_exp: string;
  value: number;
  status_pag: boolean;
  id_user: number;
};

export const DebtService = {
  findAllByDesc: async (data: findDataProp) => {
    return await prisma.debt.findMany({
      where:  data,
      orderBy: {date_exp: 'desc'}
    });
  },

  findAll: async () => {
    return await prisma.debt.findMany({});
  },

  create: async (data: createDataProp) => {
    return await prisma.debt.create({
      data: {
        description: data.description,
        date_exp: new Date(data.date_exp),
        value: data.value,
        status_pag: data.status_pag,
        id_user: data.id_user,
      }
    });
  },
};
