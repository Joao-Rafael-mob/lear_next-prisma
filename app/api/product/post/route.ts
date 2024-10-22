import prisma from '../../../libs/prisma';
import { NextResponse } from 'next/server';
import { validatePost } from '../../validations/user/validatePost';
import { Product } from '../../modal/Product';

export async function POST(req: Request) {
    let { name, description, price, imageUrl, stock}: Product = await req.json();

    
    try {
        const result = await prisma.product.create({
            data: {
                name,
                description,
                price,
                imageUrl,

                stock:{
                    create:{
                        quantity: stock.quantity,
                    },
                }

            },
            include: {
                orderProduct: true,
                reviews: true,
            },
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return NextResponse.json({ message: 'Erro ao criar usuário', error: error.message }, { status: 500 });
    }
}
