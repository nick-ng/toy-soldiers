<script lang="ts">
	import { goto } from '$app/navigation';
	import { armiesStore } from '$lib/store/army-lists';
	import { optionsStore } from '$lib/store/options';
	import { randomUUID } from '$lib/utils';
	import ListControls from '$lib/components/list-controls.svelte';
</script>

<div class="flex flex-col lg:flex-row justify-center relative">
	<div class="flex-grow flex flex-row justify-center">
		<div class="lg:basis-prose mx-1">
			<h1>Army Viewer</h1>
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
	</div>
	<details class="lg:absolute left-1 top-0 ml-1" open>
		<summary class="text-lg">Lists</summary>
		<table class="mb-2">
			<tbody>
				<tr>
					<td><label for="preview-show-army-notes-checkbox">Show Army Notes</label></td>
					<td
						><input
							id="preview-show-army-notes-checkbox"
							class="ml-2"
							type="checkbox"
							bind:checked={$optionsStore.showArmyNotes}
						/></td
					>
				</tr>
				<tr>
					<td><label for="preview-show-unit-notes-checkbox">Show Unit Notes</label></td>
					<td
						><input
							id="preview-show-unit-notes-checkbox"
							class="ml-2"
							type="checkbox"
							bind:checked={$optionsStore.showUnitNotes}
						/></td
					>
				</tr>
			</tbody>
		</table>
		<ListControls />
	</details>
</div>
