import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { validatePost } from '../../validations/user/validatePost';
import { User } from '../../modal/User';

export async function POST(req: Request) {

    let { id, name, email, senha, isAdmin, address, orders, reviews, payment }: User = await req.json();

    const errors = validatePost(name, email, senha);

    if (Object.keys(errors).length > 0) {
        console.error('Erros de validação:', errors);
        return NextResponse.json({ message: Object.values(errors).join(' ') }, { status: 400 });
    }

    senha = await bcrypt.hash(senha, 10);

    try {
        const result = await prisma.user.create({
            data: {
                name,
                email,
                senha,
                isAdmin: isAdmin,
                address: {
                    create: {
                        number: address.number,
                        district: address.district,
                        city: address.city,
                        state: address.state,
                        postalCode: address.postalCode,
                    },
                },
                orders: {
                    create: orders?.map(orders => ({
                        orderDate: new Date(),
                        status: orders.status,
                        products: {
                            create: orders.products.map(product => ({
                                productId: product.productId,
                                quantity: product.quantity,
                                price: product.price,
                                
                            })),
                        },
                    })) || [],
                },

                reviews: {
                    create: reviews?.map(review => ({
                        productId: review.productId,
                        rating: review.rating,
                        comment: review.comment,
                    })) || [],
                },
            },
            include: {
                address: true,
                orders: {
                    include: {
                        products: true,
                        payments: true,
                    },
                },
                reviews: true,
            },
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar usuário:');

        return NextResponse.json({ message: 'Erro ao criar usuário', errors, error }, { status: 500 });
    }
}
