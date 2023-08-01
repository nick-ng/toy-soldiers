<script lang="ts">
	import { page } from '$app/stores';
	import { randomUUID } from '$lib/utils';
	import { optionsStore } from '$lib/store/options';
	import '../app.css';
</script>

<div class="sticky top-0 opaque z-10">
	<nav class="flex flex-row justify-start p-2">
		<a class="button-default no-underline mr-1" href="/">Home</a>
		<a
			class="button-default no-underline mr-1"
			href="/editor{$page.params.slug ? `/${$page.params.slug}` : ''}">Editor</a
		>
		<a
			class="button-default no-underline mr-1"
			href="/viewer{$page.params.slug ? `/${$page.params.slug}` : ''}">Viewer</a
		>
		<button
			on:click={async () => {
				const state = `gh-${randomUUID()}`;

				optionsStore.update((prevOptions) => ({
					...prevOptions,
					oauthState: state
				}));

				const githubAuthUrl = new URL(import.meta.env.VITE_GITHUB_AUTH_URL);
				githubAuthUrl.searchParams.set('client_id', import.meta.env.VITE_GITHUB_CLIENT_ID);
				githubAuthUrl.searchParams.set('scope', 'read:user');
				githubAuthUrl.searchParams.set('state', state);

				window.location.assign(githubAuthUrl.toString());
			}}>Connect with GitHub</button
		>
		<div class="flex-grow" />
		<a
			class="button-default no-underline"
			href="https://github.com/nick-ng/toy-soldiers"
			target="_blank">GitHub</a
		>
	</nav>
	<hr />
</div>

<div class="mx-1">
	<slot />
</div>
