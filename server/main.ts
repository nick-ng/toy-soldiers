import { router } from './routers/index.ts';

const PORT = 8080;

const server = Deno.listen({ port: PORT });

const serveHttp = async (conn: Deno.Conn) => {
	const httpConn = Deno.serveHttp(conn);

	for await (const requestEvent of httpConn) {
		router(requestEvent);
	}
};

for await (const conn of server) {
	serveHttp(conn);
}
