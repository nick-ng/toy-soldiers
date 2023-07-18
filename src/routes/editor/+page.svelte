<script lang="ts">
	import type { Army as ArmyType } from '$lib/types';
	import { armiesStore } from '$lib/store/army-lists';
	import { optionsStore } from '$lib/store/options';
	import { randomUUID } from '$lib/utils';
	import ListDisplay from '$lib/components/list-display.svelte';
	import Army from './army.svelte';

	let army: ArmyType = {
		faction: '',
		name: '',
		maxPoints: 2000,
		notes: '',
		units: []
	};

	$: army = $optionsStore.armyListId ? $armiesStore[$optionsStore.armyListId] : army;
</script>

<div class="flex flex-row justify-center">
	<div>
		<h2>Lists</h2>
		<ul>
			{#each Object.entries($armiesStore).sort((a, b) => {
				const aName = a[1].name ? `${a[1].name} - ${a[1].faction}` : `Unnamed ${a[1].faction} Army`;
				const bName = b[1].name ? `${b[1].name} - ${b[1].faction}` : `Unnamed ${b[1].faction} Army`;

				return aName.localeCompare(bName);
			}) as temp}
				<li>
					<button
						on:click={() => {
							optionsStore.update((prevOptions) => ({
								...prevOptions,
								armyListId: temp[0]
							}));
						}}
						>{temp[1].name
							? `${temp[1].name} - ${temp[1].faction}`
							: `Unnamed ${temp[1].faction} Army`}</button
					>
				</li>
			{/each}
			<li>
				<button
					on:click={() => {
						armiesStore.update((prevArmies) => {
							const newArmyId = randomUUID();

							optionsStore.update((prevOptions) => ({
								...prevOptions,
								armyListId: newArmyId
							}));

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
					}}>New Army</button
				>
			</li>
		</ul>
	</div>
	<div class="basis-prose mx-4">
		<h1>Editor</h1>
		{#if $optionsStore.armyListId && $armiesStore[$optionsStore.armyListId]}
			<Army armyId={$optionsStore.armyListId} />
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
		{#if $optionsStore.armyListId && $armiesStore[$optionsStore.armyListId]}
			<ListDisplay
				army={$armiesStore[$optionsStore.armyListId]}
				showArmyNotes={!!$optionsStore.showArmyNotes}
				showUnitNotes={!!$optionsStore.showUnitNotes}
			/>
		{/if}
	</div>
</div>
