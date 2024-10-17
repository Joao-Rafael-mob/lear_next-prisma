import prisma from './app/lib/prisma';

async function main(req: Request) {
  const { email } = await req.json();

  // Extensão para adicionar uma função personalizada ao modelo User
  const extendedPrisma = prisma.$extends({
    name: 'GET',
    query: {
      user: {
        async findFirst({ model, operation, args, query }) {
          const user = await query(args)

          if (user.senha !== undefined) {
            user.senha = '******'
          }

          return user;
        },
      },
    },
  });

  try {
    const user = await extendedPrisma.user.findFirst({
      where: {
        email,
      }
    });
    console.log(user);
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chamada da função main com um Request de exemplo (em produção, seria chamado a partir de uma API)
main(new Request('https://example.com', { method: 'POST', body: JSON.stringify({ email: '121@adww' }) }))
  .then(() => console.log('Processo finalizado'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
