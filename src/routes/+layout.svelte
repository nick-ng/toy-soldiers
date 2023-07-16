<script lang="ts">
	import '../app.css';
</script>

<nav class="flex flex-row justify-start p-2">
	<a class="button-default no-underline mr-1" href="/editor">Editor</a>
	<a class="button-default no-underline mr-1" href="/view">Viewer</a>
	<div class="flex-grow" />
	<a
		class="button-default no-underline"
		href="https://github.com/nick-ng/toy-soldiers"
		target="_blank">GitHub</a
	>
</nav>

<hr />

<div class="mx-1">
	<slot />
</div>
