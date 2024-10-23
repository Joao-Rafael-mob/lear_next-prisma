import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import { validatePut } from "../../../validations/product/validatePut";
import { saveImg } from "../../../validations/global/saveImg";


export async function PUT(req: Request) {

    try {
        const formData = await req.formData();
        const id = parseInt(formData.get('id') as string, 10);
        const name = formData.get('name')?.toString();
        const description = formData.get('description')?.toString();
        const price = parseFloat(formData.get('price') as string);
        const imageFile = formData.get('image') as File;
        const stockQuantity = parseInt(formData.get('stockQuantity') as string, 10);

        const existingProduct = await prisma.product.findUnique({ where: { id } });
        const existingImageUrl = existingProduct?.imageUrl;
        const imageUrl = await saveImg(imageFile, existingImageUrl);

        validatePut(id, name, description, price, imageUrl, { quantity: stockQuantity });

        const result = await prisma.product.update({
            where: {
                id,
            },
            data: {
                name,
                description,
                price,
                imageUrl,
                stock: {
                    update: {
                        quantity: stockQuantity,
                    },
                }

            },
            include: {
                stock: true,
                orderProduct: true,
                reviews: true,
            },
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao alterar Produto:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            console.error('Erro inesperado ao alterar Produto:', error);
            return NextResponse.json({ message: 'Erro inesperado ao alterar Produto' }, { status: 500 });
        }
    }
}