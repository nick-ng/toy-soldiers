export const getBody = (requestEvent: Deno.RequestEvent) => {
	console.log('content-type', requestEvent.request.headers.get('content-type'));
};

export const router = async (requestEvent: Deno.RequestEvent) => {
	switch (requestEvent.request.method) {
		case 'GET':
		default: {
			requestEvent.respondWith(
				new Response('Hello world', {
					status: 200
				})
			);
		}
	}
};
