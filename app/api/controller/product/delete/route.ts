import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import { validateDelete } from "../../../validations/product/validateDelete";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = (searchParams.get('id') as string,10);

    try {
        validateDelete(id);

        const result = await prisma.product.delete({
            where: {
                id,
            },
            include:{
                categories:{
                    include:{
                        products: true,

                    }
                },
                stock:{
                    select:{
                        quantity: true
                    }
                }
            }
        });
        if (!result) {
            return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 });
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao deleta Produto:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            console.error('Erro inesperado ao deleta Produto:', error);
            return NextResponse.json({ message: 'Erro inesperado ao deleta Produto' }, { status: 500 });
        }
    }
}
