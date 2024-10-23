import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import bcrypt from 'bcryptjs';
import { User } from "../../../modal/User";
import { validatePut } from "../../../validations/user/validatePut";

export async function PUT(req: Request) {
    let { id, name, email, senha, isAdmin }: User = await req.json();

    try {
        validatePut(id, name, email, senha)

        const result = await prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                senha: senha ? await bcrypt.hash(senha, 10) : senha,
                isAdmin,
            }
        });

        if (!result) {
            return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
    if (error instanceof Error) {
        console.error('Erro ao atualizar usuário:', error.message);
        return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
        console.error('Erro inesperado ao atualizar usuário:', error);
        return NextResponse.json({ message: 'Erro inesperado ao atualizar usuário' }, { status: 500 });
    }
    }
}