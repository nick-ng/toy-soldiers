console.log(Deno.env.get('TEST_YML'));
console.log(Deno.env.get('TEST_FILE'));
console.log('hi');

const main = async () => {
	const statusCmd = new Deno.Command('ls', {
		args: ['-a']
	});

	const { stdout } = await statusCmd.output();
	const statusStr = new TextDecoder().decode(stdout);

	console.log('statusStr', statusStr);
};

main();
