<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { optionsStore } from '$lib/store/options';
	import { IdentityStore } from '$lib/store/identity';

	onMount(() => {
		const authCode = $page.url.searchParams.get('code');
		const authState = $page.url.searchParams.get('state');

		if (authState !== $optionsStore.oauthState) {
			alert('Danger Will Robinson!');

			return;
		}

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

			if (res.status !== 200) {
				console.debug('Probably expired or something?');

				return;
			}

			// @todo(nick-ng): use zod to validate response body
			const resJson = await res.json();

			IdentityStore.set(resJson);
		})();
	});
</script>

<p>Completing Auth...</p>
