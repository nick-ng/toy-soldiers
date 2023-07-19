<script lang="ts">
	import '../app.css';
</script>

<div class="sticky top-0 opaque z-10">
	<nav class="flex flex-row justify-start p-2">
		<a class="button-default no-underline mr-1" href="/">Home</a>
		<a class="button-default no-underline mr-1" href="/editor">Editor</a>
		<a class="button-default no-underline mr-1" href="/viewer">Viewer</a>
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
