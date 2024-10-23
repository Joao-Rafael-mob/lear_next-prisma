import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import { validateGet } from "../../../validations/product/validateGet";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name')

    try {
        validateGet(name);

        const result = await prisma.product.findFirst({
            where: {
                name,
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
            console.error('Erro ao obter Produto:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            console.error('Erro inesperado ao obter Produto:', error);
            return NextResponse.json({ message: 'Erro inesperado ao obter Produto' }, { status: 500 });
        }
    }
}
