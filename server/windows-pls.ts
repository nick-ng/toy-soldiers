const WATCH_DIRECTORY = './server/';
const WATCH_DEBOUNCE_MS = 200;
const ALLOWED_EXTENSIONS: string[] = ['.ts'];

const restart = () => {
	console.info(new Date().toString(), 'Restarting the docker container...');

	const statusCmd = new Deno.Command('docker', {
		args: ['compose', 'restart']
	});

	return statusCmd.output();
};

const watcher = Deno.watchFs(WATCH_DIRECTORY);

console.info(new Date().toString(), `watching ${WATCH_DIRECTORY}`);

let restartTimeoutId = -1;
let restartEventQueue: Deno.FsEvent[] = [];

for await (const event of watcher) {
	let onlyThisFile = true;
	const foundAllowedExtensions: string[] = [];

	for (const path of event.paths) {
		if (!path.endsWith('/windows-pls.ts')) {
			onlyThisFile = false;
		}

		for (const ext of ALLOWED_EXTENSIONS) {
			if (path.endsWith(ext)) {
				foundAllowedExtensions.push(path);
			}
		}
	}

	if (foundAllowedExtensions.length === 0 || onlyThisFile) {
		continue;
	}

	restartEventQueue.push(event);

	if (restartTimeoutId < 0) {
		restartTimeoutId = setTimeout(() => {
			console.debug(
				'restartEventQueue',
				restartEventQueue.length,
				restartEventQueue.map((a) => a.paths).flat()
			);

			restart();

			restartTimeoutId = -1;
			restartEventQueue = [];
		}, WATCH_DEBOUNCE_MS);
	}
}

console.debug('hello?');
