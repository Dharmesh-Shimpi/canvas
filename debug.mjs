// debug.mjs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
	try {
		const account = await prisma.account.findUnique({
			where: {
				provider_providerAccountId: {
					provider: 'google',
					providerAccountId: '117082056045896581956',
				},
			},
			select: {
				user: true,
			},
		});
		console.log(account);
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
}

run();
