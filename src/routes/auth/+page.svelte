<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { IdentityStore } from '$lib/store/identity';

	onMount(() => {
		const authCode = $page.url.searchParams.get('code');
		const authState = $page.url.searchParams.get('state');

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

			// @todo(nick-ng): use zod to validate response body
			const resJson = await res.json();

			IdentityStore.set(resJson);
		})();
	});
</script>

<p>Completing Auth...</p>
