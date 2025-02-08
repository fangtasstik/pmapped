import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
import PrismaClientSingleton from "../../prisma/prismaClient"

// const prisma = new PrismaClient();
const prisma = PrismaClientSingleton.getInstance()

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error instanceof Error ? error.message : error}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { 
      name, 
      description, 
      startDate, 
      endDate } = req.body;
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error instanceof Error ? error.message : error}` });
  }
};