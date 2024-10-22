import prisma from "../../../libs/prisma";
import { NextResponse } from "next/server";
import { validateGet } from "../../validations/user/validateGet";
import { validateDelete } from "../../validations/user/validateDelete";

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    try {
        validateDelete(email);

        const result = await prisma.user.delete({
            where: {
                email,
            },
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
