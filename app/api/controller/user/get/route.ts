import prisma from "../../../../libs/prisma";
import { NextResponse } from "next/server";
import { validateGet } from "../../../validations/user/validateGet";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    try {
        validateGet(email);

        const result = await prisma.user.findUnique({
            where: {
                email,
            },
            include:{
                orders:{
                    include:{
                        orderProduct: true,
                        payments: true,
                        user: true
                    }
                },
                address: true              
            }
        });
        if (!result) {
            return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao obter usuário:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            console.error('Erro inesperado ao obter usuário:', error);
            return NextResponse.json({ message: 'Erro inesperado ao obter usuário' }, { status: 500 });
        }
    }
}
