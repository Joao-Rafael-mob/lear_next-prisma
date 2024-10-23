import prisma from '../../../../libs/prisma';
import { NextResponse } from 'next/server';
import { validatePost } from '../../../validations/product/validatePost';
import { saveImg } from '../../../validations/global/saveImg';

export async function POST(req: Request) {

    try {
        const formData = await req.formData();
        const name = formData.get('name')?.toString();
        const description = formData.get('description')?.toString();
        const price = parseFloat(formData.get('price') as string);
        const imageFile = formData.get('image') as File;
        const stockQuantity = parseInt(formData.get('stockQuantity') as string, 10);
      
        const imageUrl = await saveImg(imageFile);

        validatePost(name, description, price, imageUrl);

        const result = await prisma.product.create({
            data: {
                name,
                description,
                price,
                imageUrl,
                stock: {
                    create: {
                        quantity: stockQuantity,
                    },
                }

            },
            include: {
                stock:true,
                orderProduct: true,
                reviews: true,
            },
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao cadastra Produto:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            console.error('Erro inesperado ao cadastra Produto:', error);
            return NextResponse.json({ message: 'Erro inesperado ao cadastra Produto' }, { status: 500 });
        }
    }
}
