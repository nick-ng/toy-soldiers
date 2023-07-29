// GET https://github.com/login/oauth/authorize

const GITHUB_AUTH_URL = Deno.env.get('GITHUB_AUTH_URL');
const GITHUB_CLIENT_ID = Deno.env.get('GITHUB_CLIENT_ID');
const GITHUB_REDIRECT_URI = Deno.env.get('GITHUB_REDIRECT_URI');
const GITHUB_SECRET = Deno.env.get('GITHUB_SECRET');

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

export const handleAuthRoutes = (
	requestEvent: Deno.RequestEvent,
	pathFragments: string[],
	requestUrl: URL,
	accessControlAllowOrigin: string
) => {
	// requestEvent.request.method

	switch (pathFragments[1]) {
		case 'begin': {
			const state = requestUrl.searchParams.get('state');
			if (!state) {
				requestEvent.respondWith(
					new Response('No state in search params', {
						status: 400
					})
				);

				break;
			}

			if (!GITHUB_AUTH_URL) {
				requestEvent.respondWith(
					new Response('No GitHub auth url configured', {
						status: 500
					})
				);

				break;
			}
			const url = new URL(GITHUB_AUTH_URL);
			url.searchParams.set('state', state);

			if (!GITHUB_CLIENT_ID) {
				requestEvent.respondWith(
					new Response('No GitHub client id configured', {
						status: 500
					})
				);

				break;
			}
			url.searchParams.set('client_id', GITHUB_CLIENT_ID);

			if (!GITHUB_CLIENT_ID) {
				requestEvent.respondWith(
					new Response('No GitHub client id configured', {
						status: 500
					})
				);

				break;
			}
			url.searchParams.set('client_id', GITHUB_CLIENT_ID);

			requestEvent.respondWith(
				new Response(
					JSON.stringify({
						url: url.toString()
					}),
					{
						status: 200,
						headers: {
							'content-type': 'application/json',
							'access-control-allow-origin': accessControlAllowOrigin
						}
					}
				)
			);
			break;
		}
		case 'finish': {
			(async () => {
				try {
					const reqJson = await requestEvent.request.json();
					console.log('reqJson', reqJson);

					const res = await fetch('https://github.com/login/oauth/access_token', {
						method: 'POST',
						headers: {
							accept: 'application/json',
							'content-type': 'application/json'
						},
						body: JSON.stringify({
							client_id: GITHUB_CLIENT_ID,
							client_secret: GITHUB_SECRET,
							code: reqJson?.authCode
						})
					});

					const resJson = await res.json();

					console.log('res', res);
					console.log('resJson', resJson);

					// @todo(nick-ng): use resJson.access_token to get username from GitHub

					requestEvent.respondWith(
						new Response(JSON.stringify({}), {
							status: 200,
							headers: {
								'content-type': 'application/json',
								'access-control-allow-origin': accessControlAllowOrigin
							}
						})
					);
				} catch (e) {
					// oop
					requestEvent.respondWith(
						new Response('Something went wrong', {
							status: 500
						})
					);
				}
			})();

			break;
		}
		default: {
			requestEvent.respondWith(
				new Response('Hello Auth', {
					status: 200,
					headers: {
						'access-control-allow-origin': accessControlAllowOrigin
					}
				})
			);
		}
	}
};
