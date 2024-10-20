import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { validatePost } from '../../validations/user/validatePost';

export async function POST(req: Request) {

    let {name, email, senha, isAdmin } = await req.json();

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
            },
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar usuário:');

        return NextResponse.json({ message: 'Erro ao criar usuário' }, { status: 500 });
    }
}
