<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
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
				// @todo(nick-ng): can probably put client_id on front-end since they can see it in the url
				// @todo(nick-ng): include scope read:user
				// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
				const res = await fetch('http://localhost:3232/auth/begin?state=test1234', {
					mode: 'cors'
				});

				try {
					const resJson = await res.json();

					if (resJson?.url) {
						window.location = resJson.url;
					}
				} catch (e) {}
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
