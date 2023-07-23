const main = async () => {
	console.info('Restarting the docker container...');

	const statusCmd = new Deno.Command('docker', {
		args: ['compose', 'restart']
	});

	await statusCmd.output();
};

main();
