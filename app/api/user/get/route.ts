import { PrismaClient } from "@prisma/client";
import prisma from "../../../lib/prisma";


export async function GET(req: Request) {

    const { email } = await req.json();
    
    prisma.$extends({
        name: 'GET',
        model: {
            user: {
                async s(email: string){
                    await prisma.user.findUnique({ where: { email } })
                }
            }
        }

    })
}