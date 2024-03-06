import { encodeJWT } from '../utils/index.ts';

const GITHUB_AUTH_URL = Deno.env.get('GITHUB_AUTH_URL');
const GITHUB_CLIENT_ID = Deno.env.get('GITHUB_CLIENT_ID');
const GITHUB_SECRET = Deno.env.get('GITHUB_SECRET');
const JWT_SECRET = Deno.env.get('JWT_SECRET');

const JWT_EXPIRY_MS = 1000 * 60 * 60 * 24; // 1 day

// @todo(nick-ng): use zod to validate request body
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
			url.searchParams.set('scope', 'read:user');

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
			if (!JWT_SECRET) {
				requestEvent.respondWith(
					new Response('No jwt secret configured', {
						status: 500
					})
				);

				break;
			}

			(async () => {
				try {
					// @todo(nick-ng): use zod to validate request
					const reqJson = await requestEvent.request.json();

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

					// @todo(nick-ng): use zod to validate response from github?
					const resJson = await res.json();

					const { access_token: accessToken } = resJson;

					const res2 = await fetch('https://api.github.com/user', {
						method: 'GET',
						headers: {
							authorization: `Bearer ${accessToken}`,
							accept: 'application/json'
						}
					});

					// @todo(nick-ng): use zod to validate response from github?
					const res2Json = await res2.json();

					if (!res2Json.login) {
						requestEvent.respondWith(
							new Response("Could'nt get user data from GitHub", {
								status: 401,
								headers: {
									'content-type': 'application/json',
									'access-control-allow-origin': accessControlAllowOrigin
								}
							})
						);

						return;
					}

					const responseBody = {
						ghAccessToken: accessToken,
						jwt: encodeJWT(
							{
								login: res2Json.login,
								exp: Date.now() + JWT_EXPIRY_MS
							},
							JWT_SECRET
						)
					};

					requestEvent.respondWith(
						new Response(JSON.stringify(responseBody), {
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
