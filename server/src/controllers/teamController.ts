import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
import PrismaClientSingleton from "../../prisma/prismaClient";

// const prisma = new PrismaClient();
const prisma = PrismaClientSingleton.getInstance();

export const getTeams = async (
  req: Request,
  res: Response
): Promise<void> => {
	try {
		const teams = await prisma.team.findMany();

    // add extra info to the result
		const teamWithUsernames = await Promise.all(
			teams.map(async (team) => {
				const productOwner = await prisma.user.findUnique({
					where: { userId: team.productOwnerUserId! },
					select: { username: true },
				});

				const projectManager = await prisma.user.findUnique({
					where: { userId: team.projectManagerUserId! },
					select: { username: true },
				});

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectManager?.username,
        }
			})
		);
		res.json(teamWithUsernames);
	} catch (error: any) {
		res.status(500).json({
			message: `Error retrieving teams: ${
				error instanceof Error ? error.message : error
			}`,
		});
	}
};
