import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    let id = searchParams.get('userId');

    try {
        const result = await prisma.address.findFirst({
            where: {
                userId: Number(id)
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