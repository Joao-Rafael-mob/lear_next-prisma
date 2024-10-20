import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from 'bcryptjs';
import { validatePut } from "../../validations/user/validatePut";

export async function PUT(req: Request) {
    let { id, name, email, senha, isAdmin } = await req.json();

    const validationErrors = validatePut(id, name, email, senha);

    if (Object.keys(validationErrors).length > 0) {
        console.error('Erros de validação:', validationErrors);
        return NextResponse.json({ message: Object.values(validationErrors).join(' ') }, { status: 400 });
    }
    const hashedSenha = await bcrypt.hash(senha, 10);

    try {
        const result = await prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                senha: hashedSenha,
                isAdmin,
            }
        });
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return NextResponse.json({ message: 'Erro ao atualizar usuário' }, { status: 500 });
    }
}