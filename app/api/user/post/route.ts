import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    const { name, email, senha, isAdmin } = await req.json();

    try {
        const result = await extendedPost.user.create({
            data: {
                name,
                email,
                senha,
                isAdmin: isAdmin ? 'ADMIN' : 'USER',
            },
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {

            if (error.message.includes('Invalid email format')) {
                return NextResponse.json({ message: 'Formato de e-mail inválido' }, { status: 400 });
            }
            return NextResponse.json({ message: error.message }, { status: 400 });

        }
        console.error(error);
        return NextResponse.json({ message: 'Erro ao criar usuário' }, { status: 500 });
    }
}

const extendedPost = prisma.$extends({
    name: 'UserValidation',
    query: {
        user: {
            async create({ model, operation, args, query }) {
                const { name, email, senha } = args.data;

                if (!name || !email || !senha) {
                    throw new Error('Nome, email e senha são obrigatórios');
                }

                const existingUser = await prisma.user.findUnique({
                    where: { email },
                });

                if (existingUser) {
                    throw new Error('Email is used');
                }

                if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
                    throw new Error('Formato de e-mail inválido');
                }

                args.data.senha = await bcrypt.hash(senha, 10);

                return query(args)
            },
        },
    },
});

