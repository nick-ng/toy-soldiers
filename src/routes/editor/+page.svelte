<script lang="ts">
	import { goto } from '$app/navigation';
	import { armiesStore } from '$lib/store/army-lists';
	import { randomUUID } from '$lib/utils';
	import ListControls from '$lib/components/list-controls.svelte';
</script>

<div class="flex flex-row justify-center">
	<div class="mr-4">
		<h2>Lists</h2>
		<ListControls showNewArmyButton />
		<details class="w-64">
			<summary class="text-xl">Help</summary>
			<p>The army list is saved on your browser as soon as you make any changes.</p>
			<p>
				The larger text boxes for notes use <a href="https://commonmark.org/help/" target="_blank"
					>Markdown</a
				> with some things like URLs and images disabled. Notably, to get text to appear on a new line,
				you need to insert two new lines or use a list.
			</p>
		</details>
	</div>
	<div class="basis-prose mr-4">
		<div class="flex flex-row items-center">
			<h1 class="inline">Editor</h1>
		</div>
		{#if Object.keys($armiesStore).length > 0}
			<p>Choose an army</p>
		{:else}
			<p>
				<button
					on:click={() => {
						const newArmyId = randomUUID();

						armiesStore.update((prevArmies) => {
							return {
								...prevArmies,
								[newArmyId]: {
									faction: '',
									maxPoints: 2000,
									name: '',
									notes: '',
									units: []
								}
							};
						});

						goto(`/editor/${newArmyId}`);
					}}>Make an Army</button
				>
			</p>
		{/if}
	</div>
	<div class="basis-prose">
		<h2>Preview</h2>
	</div>
</div>
