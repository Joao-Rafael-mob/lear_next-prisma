import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { validatePost } from '../../validations/user/validatePost';
import { User } from '../../modal/User';
import { Product } from '../../modal/';

export async function POST(req: Request) {
    let { name, email, senha, isAdmin, address, orders }: Product = await req.json();

    // Validação dos dados do usuário
    const errors = validatePost(name, email, senha);
    if (Object.keys(errors).length > 0) {
        console.error('Erros de validação:', errors);
        return NextResponse.json({ message: Object.values(errors).join(' ') }, { status: 400 });
    }

    // Criptografar a senha do usuário
    senha = await bcrypt.hash(senha, 10);

    try {
        // Criar o usuário no banco de dados
        const result = await prisma.user.create({
            data: {
              
            },
            include: {
            
            },
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return NextResponse.json({ message: 'Erro ao criar usuário', error: error.message }, { status: 500 });
    }
}
