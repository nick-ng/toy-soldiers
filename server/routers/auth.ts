// GET https://github.com/login/oauth/authorize

const a = {
	client_id: 'a',
	redirect_uri: 'asdf',
	state: 'asdf'
};

// POST https://github.com/login/oauth/access_token

/**
 * Accept: application/json
{
  "access_token":"gho_16C7e42F292c6912E7710c838347Ae178B4a",
  "scope":"repo,gist",
  "token_type":"bearer"
}
 */

const b = {
	client_id: 'a',
	client_secret: 'asdf',
	code: 'a',
	redirect_uri: 'a'
};

export const handleAuthRoutes = (requestEvent: Deno.RequestEvent, pathFragments: string[]) => {
	console.log('Auth pathFragments', pathFragments);
	const { headers, destination } = requestEvent.request;
	console.log('headers', headers);
	console.log('destination', destination);

	// requestEvent.request.method

	switch (pathFragments[1]) {
		default: {
			requestEvent.respondWith(
				new Response('Hello Auth', {
					status: 200
				})
			);
		}
	}
};
