import { encodeJWT } from './utils/index.ts';

const JWT_SECRET = Deno.env.get('JWT_SECRET');

const main = async () => {
	if (!JWT_SECRET) {
		throw new Error('No JWT_SECRET set');
	}

	const jwt = encodeJWT(
		{
			sub: '1234567890',
			name: 'John Doe',
			admin: true
		},
		JWT_SECRET
	);

	console.debug('jwt', jwt);
};

main();
