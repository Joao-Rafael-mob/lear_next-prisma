import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { validateGet } from "../../validations/user/validateGet";

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const validationErrors = validateGet(email);

    if (Object.keys(validationErrors).length > 0) {
        console.error('Erros de validação:', validationErrors);
        return NextResponse.json({ message: Object.values(validationErrors).join(' ') }, { status: 400 });
    }

    try {
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
        console.error('Erro ao processar requisição:');
        return NextResponse.json({ message: 'Erro ao processar requisição' }, { status: 500 });
    }
}
