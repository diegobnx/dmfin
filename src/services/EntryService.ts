import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type createDataProp = {
  description: string;
  date_in: Date;
  value: number;
  id_user: number;
};

type findDataProp = {
  description: string;
};

export const EntryService = {
  findAllByDesc: async (data: findDataProp) => {
    return await prisma.entry.findMany({
      where: {
        description: {
          contains: data.description,
        },
      },
      orderBy: { date_in: "desc" },
    });
  },

  findAll: async () => {
    return await prisma.entry.findMany({});
  },

  create: async (data: createDataProp) => {
    return await prisma.entry.create({
      data: {
        description: data.description,
        date_in: new Date(data.date_in),
        value: data.value,
        id_user: data.id_user,
      },
    });
  },
};
