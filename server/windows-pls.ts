const WATCH_DIRECTORY = './server/';
const WATCH_DEBOUNCE_MS = 200;
const IGNORED_EXTENSIONS: string[] = [];

const restart = () => {
	console.info('Restarting the docker container...');

	const statusCmd = new Deno.Command('docker', {
		args: ['compose', 'restart']
	});

	return statusCmd.output();
};

const watcher = Deno.watchFs(WATCH_DIRECTORY);

console.log(`watching ${WATCH_DIRECTORY}`);

let restartTimeoutId = -1;
let restartEventQueue: Deno.FsEvent[] = [];

for await (const event of watcher) {
	let onlyThisFile = true;
	const foundIgnoredExtensions: string[] = [];
	let onlyIgnoredExtensions = true;

	for (const path of event.paths) {
		if (!path.endsWith('/windows-pls.ts')) {
			onlyThisFile = false;

			continue;
		}

		for (const ext of IGNORED_EXTENSIONS) {
			if (path.endsWith(ext)) {
				foundIgnoredExtensions.push(path);
			} else {
				onlyIgnoredExtensions = false;
			}
		}
	}

	if (onlyThisFile && onlyIgnoredExtensions) {
		// console.debug('Skipping restart because:');
		// onlyThisFile && console.debug('Only windows-pls.ts changed.');
		// if (onlyIgnoredExtensions) {
		// 	console.debug('Only ignored extensions changed:');
		// 	foundIgnoredExtensions.forEach((t) => {
		// 		console.debug(`  ${t}`);
		// 	});
		// }

		continue;
	}

	restartEventQueue.push(event);

	if (restartTimeoutId < 0) {
		restartTimeoutId = setTimeout(() => {
			console.log(
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

console.log('hello?');
