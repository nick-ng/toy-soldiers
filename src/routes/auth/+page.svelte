<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		const authCode = $page.url.searchParams.get('code');
		const authState = $page.url.searchParams.get('state');
		console.log('authCode', authCode);
		console.log('authState', authState);
		(async () => {
			const res = await fetch('http://localhost:3232/auth/finish', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					authCode,
					authState
				})
			});
		})();
	});
</script>

<p>Completing Auth</p>
