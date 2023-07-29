import { handleAuthRoutes } from './auth.ts';

const CORS_ORIGINS = Deno.env.get('CORS_ORIGINS')?.split(';') || [];

export const getBody = (requestEvent: Deno.RequestEvent) => {
	console.log('content-type', requestEvent.request.headers.get('content-type'));
};

export const router = async (requestEvent: Deno.RequestEvent) => {
	const url = new URL(requestEvent.request.url);
	const { headers } = requestEvent.request;

	const pathFragments = url.pathname.split('/').filter((p) => p);

	let accessControlAllowOrigin = '';

	for (let i = 0; i < CORS_ORIGINS.length; i++) {
		if (headers.get('origin') === CORS_ORIGINS[i]) {
			accessControlAllowOrigin = CORS_ORIGINS[i];
			break;
		}
	}

	if (!accessControlAllowOrigin) {
		console.log('headers.origin', headers.get('origin'));
		console.log('CORS_ORIGINS', CORS_ORIGINS);

		requestEvent.respondWith(
			new Response('Invalid origin', {
				status: 403,
				headers: {
					'access-control-allow-origin': '*'
				}
			})
		);
		return;
	}

	console.log('accessControlAllowOrigin', accessControlAllowOrigin);

	if (requestEvent.request.method === 'OPTIONS') {
		console.log('is options');
		requestEvent.respondWith(
			new Response(null, {
				status: 204,
				headers: {
					'access-control-allow-methods': 'POST, GET, OPTIONS',
					'access-control-allow-origin': accessControlAllowOrigin,
					'access-control-allow-headers': '*',
					'access-control-max-age': '86400'
				}
			})
		);
		return;
	}

	switch (pathFragments[0]) {
		case 'auth': {
			return handleAuthRoutes(requestEvent, pathFragments, url, accessControlAllowOrigin);
		}
		case undefined: {
			requestEvent.respondWith(
				new Response('Hello world', {
					status: 200
				})
			);
			return;
		}
		default: {
			requestEvent.respondWith(
				new Response('Not Found', {
					status: 404
				})
			);
		}
	}
};
