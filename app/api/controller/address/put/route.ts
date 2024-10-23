import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import { Address } from "../../../modal/Address";
import { validatePut } from "../../../validations/address/validatePut";


export async function PUT(req: Request) {
    let { userId, number, district, city, state, postalCode }: Address = await req.json();

    try {
        validatePut(userId, number, district, city, state, postalCode);
        const result = await prisma.address.update({
            where: {
                userId,
            },
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

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao altera usuário:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            console.error('Erro inesperado ao altera usuário:', error);
            return NextResponse.json({ message: 'Erro inesperado ao altera usuário' }, { status: 500 });
        }
    }
}