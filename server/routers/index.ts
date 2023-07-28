import { handleAuthRoutes } from './auth.ts';

export const getBody = (requestEvent: Deno.RequestEvent) => {
	console.log('content-type', requestEvent.request.headers.get('content-type'));
};

export const router = async (requestEvent: Deno.RequestEvent) => {
	const url = new URL(requestEvent.request.url);

	const pathFragments = url.pathname.split('/').filter((p) => p);

	switch (pathFragments[0]) {
		case 'auth': {
			return handleAuthRoutes(requestEvent, pathFragments);
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
