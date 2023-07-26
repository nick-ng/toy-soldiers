console.log(Deno.env.get('TEST_YML'));
console.log(Deno.env.get('TEST_FILE'));

import { router } from './routers/index.ts';

const PORT = 8080;

const server = Deno.listen({ port: PORT });

let counter = 0;

const serveHttp = async (conn: Deno.Conn) => {
	counter = counter + 1;
	const httpConn = Deno.serveHttp(conn);

	let counter2 = 0;

	for await (const requestEvent of httpConn) {
		console.log('counters', counter, counter2++);
		console.log('method', requestEvent.request.method);

		router(requestEvent);
	}
};

for await (const conn of server) {
	serveHttp(conn);
}
