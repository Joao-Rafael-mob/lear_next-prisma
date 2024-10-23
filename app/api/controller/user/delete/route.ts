import prisma from "../../../../libs/prisma";
import { NextResponse } from "next/server";
import { validateDelete } from "../../../validations/user/validateDelete";

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    try {
        validateDelete(email);

        const userWithRelations = await prisma.user.findUnique({
            where: { email },
            include: {
                address: true,
                orders: true,  
                reviews: true,  
                Payment: true,  
            },
        });

        if (!userWithRelations) {
            return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
        }

        const relatedMessages = [];
        if (userWithRelations.address) {
            relatedMessages.push("Endereço "+`${userWithRelations.address}`);
        }
        if (userWithRelations.orders.length > 0) {
            relatedMessages.push("Pedidos");
        }
        if (userWithRelations.reviews.length > 0) {
            relatedMessages.push("Avaliações");
        }
        if (userWithRelations.Payment.length > 0) {
            relatedMessages.push("Pagamentos");
        }

        if (relatedMessages.length > 0) {
            return NextResponse.json({
                message: `O usuário possui os seguintes registros relacionados: ${relatedMessages.join(', ')}. Não é possível excluir o usuário.`
            }, { status: 400 });
        }

        const result = await prisma.user.deleteMany({
            where: {
                email,
            },
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao excluir usuário:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            console.error('Erro inesperado ao excluir usuário:', error);
            return NextResponse.json({ message: 'Erro inesperado ao excluir usuário' }, { status: 500 });
        }
    }
}
