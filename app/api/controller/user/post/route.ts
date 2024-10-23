import prisma from '../../../../libs/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { validatePost } from '../../../validations/user/validatePost';
import { User } from '../../../modal/User';

export async function POST(req: Request) {

    let { name, email, senha, isAdmin }: User = await req.json();

    senha = await bcrypt.hash(senha, 10);

    try {
        validatePost(name, email, senha);

        const result = await prisma.user.create({
            data: {
                name,
                email,
                senha,
                isAdmin: isAdmin,
            },
            include: {
                address: true,
                orders: {
                    include: {
                        orderProduct: true,
                        payments: true,
                    },
                },
                reviews: true,
            },
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao cadastra usuário:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            console.error('Erro inesperado ao cadastra usuário:', error);
            return NextResponse.json({ message: 'Erro inesperado ao cadastra usuário' }, { status: 500 });
        }
    }
}
