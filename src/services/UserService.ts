import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type findOneDataProp = {
  id?: number;
  email?: string;
};

type createDataProp = {
  email: string;
  password: string;
  name: string;
};

export const UserService = {
  findOne: async (data: findOneDataProp) => {
      return await prisma.user.findUnique({ where: data });
  },

  create: async (data: createDataProp) => {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });
  },
};