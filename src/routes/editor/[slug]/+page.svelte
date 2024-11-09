<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { armiesStore } from '$lib/store/army-lists';
	import { optionsStore } from '$lib/store/options';
	import ListControls from '$lib/components/list-controls.svelte';
	import ArmyDisplay from '$lib/components/army-display.svelte';
	import Army from './army.svelte';
	import { getListName } from '$lib/utils';

	$: armyId = $page.params.slug;
	$: currentArmy = armyId ? $armiesStore[armyId] : null;
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
			<div class="flex-grow"></div>
			{#if currentArmy}
				<a
					href={`data:text/json;charset=utf-8,${JSON.stringify(currentArmy)}`}
					download={`${getListName(currentArmy).replaceAll(/[^a-z0-9-]+/gi, '_')}.json`}
					class="ml-1 no-underline opaque button-default">Download</a
				>
				<button
					class="ml-1 px-1 cannot-hover:px-2 opaque"
					on:click={() => {
						navigator.clipboard.writeText(JSON.stringify(currentArmy));
					}}>📋</button
				>
			{/if}
			<button
				class="ml-1 px-0 cannot-hover:px-2 opaque"
				on:click={() => {
					armiesStore.update((prevArmies) => {
						if (!armyId) {
							return prevArmies;
						}

						delete prevArmies[armyId];

						if (Object.entries(prevArmies).length > 0) {
							const sortedArmies = Object.entries(prevArmies).sort((a, b) => {
								const aName = getListName(a[1]);
								const bName = getListName(b[1]);

								return aName.localeCompare(bName);
							});

							goto(`/editor/${sortedArmies[0][0]}`);
						} else {
							goto(`/editor`);
						}

						return prevArmies;
					});
				}}>🗑️</button
			>
		</div>
		{#if armyId && $armiesStore[armyId]}
			<Army {armyId} />
		{:else}
			<p>Make an army.</p>
		{/if}
	</div>
	<div class="basis-prose">
		<h2>Preview</h2>
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
		{#if armyId && $armiesStore[armyId]}
			<ArmyDisplay
				army={$armiesStore[armyId]}
				showArmyNotes={!!$optionsStore.showArmyNotes}
				showUnitNotes={!!$optionsStore.showUnitNotes}
			/>
		{/if}
	</div>
</div>
