import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import { Address } from "../../../modal/Address";
import { validateDelete } from "../../../validations/address/validateDelete";

export async function DELETE(req: Request) {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get('userId');

    try {
        validateDelete(Number(userId));
        const result = await prisma.address.delete({
            where: {
                userId: Number(userId),
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
            console.error('Erro ao delete usuário:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            console.error('Erro inesperado ao delete usuário:', error);
            return NextResponse.json({ message: 'Erro inesperado ao delete usuário' }, { status: 500 });
        }
    }
}