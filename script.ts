import { NextResponse } from 'next/server';
import prisma from './app/lib/prisma';

// Definindo a interface do Produto
interface ProductInput {
  name?: string; // Nome é opcional
  description?: string;
  price?: number;
  imageUrl?: string;
}

export async function POST(req: Request) {
  try {
    // Recebe os dados do produto da requisição
    const { name, description, price, imageUrl }: ProductInput = await req.json();

    // Verifica se o nome é fornecido
    if (!name) {
      return NextResponse.json({ message: 'O nome do produto é obrigatório.' }, { status: 400 });
    }

    // Cria o produto no banco de dados
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
      },
    });

    // Retorna o novo produto criado
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar o produto:', error);
    return NextResponse.json({ message: 'Erro ao criar o produto.' }, { status: 500 });
  }
}
