import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
import PrismaClientSingleton from "../../prisma/prismaClient"

// const prisma = new PrismaClient();
const prisma = PrismaClientSingleton.getInstance()

export const getUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error instanceof Error ? error.message : error}` });
  }
};
