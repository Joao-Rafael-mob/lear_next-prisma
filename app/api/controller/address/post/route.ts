import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import { Address } from "../../../modal/Address";
import { User } from "../../../modal/User";
import { validatePost } from "../../../validations/address/validatePost";


export async function POST(req: Request) {

    let { userId, number, district, city, state, postalCode }: Address = await req.json();

    try {
        validatePost(userId, number, district, city, state, postalCode);
        const result = await prisma.address.create({
            data: {
                userId,
                number,
                district,
                city,
                state,
                postalCode,

            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao cadastra usuário:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            console.error('Erro inesperado ao cadastra usuário:', error);
            return NextResponse.json({ message: 'Erro inesperado ao cadastra usuário' }, { status: 500 });
        }
    }
}
